
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value' || descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function generateRandomColor$1() {
      const color = (Math.random() * 0xffffff) | 0;
      return (
        "#" +
        "0".repeat(Math.ceil(6 - Math.log2(color) / 4) - 1) +
        color.toString(16)
      );
    }

    const CONFETTI_HEIGHT = 10;
    const CONFETTI_WIDTH = 5;

    class Confetto {
      constructor(height, speedAmplitude, color = generateRandomColor$1()) {
        this._color = color;
        this._speed = Math.random() * speedAmplitude + 0.125;
        this._seed = Math.random();
        this._offset = (Math.random() * 0xffff) | 0;
        this._positionX = this._offset;
        this._positionY = (1 - this._seed - (this._offset % 3)) * height;
        this._positionZ = Math.random() + 0.3;
      }

      draw(ctx, skewIndex, { width, height }, deltaT) {
        this._positionY += deltaT * this._speed;
        if (this._positionY < height) return;

        const skew = Math.cos((skewIndex + this._offset) / 100);

        this._positionX +=
          (skew + this._seed - 0.5) * (Math.sin(this._seed * 0xfff) % 1);

        ctx.fillStyle = this._color;
        ctx.setTransform(
          1,
          1 - skew,
          skew,
          1,
          this._positionX % (width + CONFETTI_WIDTH),
          (this._positionY % (height + CONFETTI_HEIGHT)) - CONFETTI_HEIGHT
        );
        ctx.fillRect(
          0,
          0,
          CONFETTI_WIDTH * this._positionZ,
          CONFETTI_HEIGHT * this._positionZ
        );
      }
    }

    class CanvasAnimation {
      constructor(canvas, speedAmplitude, color) {
        this._canvas = canvas;
        this._context = this._canvas.getContext("2d");
        this._skewIndex = 0;
        const density =
          (speedAmplitude * speedAmplitude) / CONFETTI_WIDTH / CONFETTI_HEIGHT;
        const nbOfConfetti = Math.sqrt(
          window.innerWidth * window.innerHeight * density
        );
        this._confetti = Array.from(
          { length: nbOfConfetti },
          () => new Confetto(window.innerHeight, speedAmplitude, color)
        );
        this._draw = this.draw.bind(this);
        requestAnimationFrame(timestamp => {
          this._lastTimestamp = timestamp;
          this.updateCanvasSize();
        });
        addEventListener("resize", this.updateCanvasSize.bind(this), {
          passive: true,
        });
      }

      draw(timestamp = this._lastTimestamp) {
        const { width, height } = this._canvas;
        const ctx = this._context;
        const skewIndex = this._skewIndex++;
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        this._confetti.forEach(confetto =>
          confetto.draw(
            ctx,
            skewIndex,
            { width, height },
            timestamp - this._lastTimestamp
          )
        );

        this._lastTimestamp = timestamp;
        requestAnimationFrame(this._draw);
      }

      updateCanvasSize() {
        this._canvas.height = document.documentElement.clientHeight;
        this._canvas.width = document.documentElement.clientWidth;
        this.draw();
      }
    }

    /* src/Button.svelte generated by Svelte v3.20.1 */

    const file = "src/Button.svelte";

    function create_fragment(ctx) {
    	let button;
    	let t;
    	let dispose;
    	let button_levels = [/*$$restProps*/ ctx[2]];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(/*text*/ ctx[1]);
    			set_attributes(button, button_data);
    			toggle_class(button, "svelte-128c2", true);
    			add_location(button, file, 70, 0, 1199);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);
    			if (remount) dispose();

    			dispose = listen_dev(
    				button,
    				"click",
    				function () {
    					if (is_function(/*handleClick*/ ctx[0])) /*handleClick*/ ctx[0].apply(this, arguments);
    				},
    				false,
    				false,
    				false
    			);
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);
    			set_attributes(button, get_spread_update(button_levels, [dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]]));
    			toggle_class(button, "svelte-128c2", true);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	const omit_props_names = ["handleClick","text"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { handleClick = Function.prototype } = $$props;
    	let { text } = $$props;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, []);

    	$$self.$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("handleClick" in $$new_props) $$invalidate(0, handleClick = $$new_props.handleClick);
    		if ("text" in $$new_props) $$invalidate(1, text = $$new_props.text);
    	};

    	$$self.$capture_state = () => ({ handleClick, text });

    	$$self.$inject_state = $$new_props => {
    		if ("handleClick" in $$props) $$invalidate(0, handleClick = $$new_props.handleClick);
    		if ("text" in $$props) $$invalidate(1, text = $$new_props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [handleClick, text, $$restProps];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { handleClick: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[1] === undefined && !("text" in props)) {
    			console.warn("<Button> was created without expected prop 'text'");
    		}
    	}

    	get handleClick() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set handleClick(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Home.svelte generated by Svelte v3.20.1 */
    const file$1 = "src/Home.svelte";

    function create_fragment$1(ctx) {
    	let header;
    	let h1;
    	let t1;
    	let h4;
    	let t3;
    	let p;
    	let t4;
    	let a0;
    	let t6;
    	let a1;
    	let t8;
    	let a2;
    	let t10;
    	let canvas;
    	let t11;
    	let footer;
    	let current;

    	const button = new Button({
    			props: {
    				handleClick: /*nextStep*/ ctx[0],
    				text: "Start",
    				autofocus: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			h1 = element("h1");
    			h1.textContent = "Fluky";
    			t1 = space();
    			h4 = element("h4");
    			h4.textContent = "Anything could happen";
    			t3 = space();
    			p = element("p");
    			t4 = text("This web app is a reproduction of\n    ");
    			a0 = element("a");
    			a0.textContent = "Fluky";
    			t6 = text("\n    – a randomizer by\n    ");
    			a1 = element("a");
    			a1.textContent = "Humblebee";
    			t8 = text("\n    – made as an exercise by\n    ");
    			a2 = element("a");
    			a2.textContent = "aduh95";
    			t10 = space();
    			canvas = element("canvas");
    			t11 = space();
    			footer = element("footer");
    			create_component(button.$$.fragment);
    			attr_dev(h1, "class", "svelte-1j1esbc");
    			add_location(h1, file$1, 86, 2, 1521);
    			attr_dev(h4, "class", "svelte-1j1esbc");
    			add_location(h4, file$1, 87, 2, 1538);
    			attr_dev(a0, "href", "http://fluky.io");
    			attr_dev(a0, "class", "svelte-1j1esbc");
    			add_location(a0, file$1, 90, 4, 1617);
    			attr_dev(a1, "href", "https://humblebee.se/");
    			attr_dev(a1, "class", "svelte-1j1esbc");
    			add_location(a1, file$1, 92, 4, 1679);
    			attr_dev(a2, "href", "https://github.com/aduh95");
    			attr_dev(a2, "class", "svelte-1j1esbc");
    			add_location(a2, file$1, 94, 4, 1758);
    			attr_dev(p, "class", "svelte-1j1esbc");
    			add_location(p, file$1, 88, 2, 1571);
    			attr_dev(header, "class", "svelte-1j1esbc");
    			add_location(header, file$1, 85, 0, 1510);
    			attr_dev(canvas, "id", "confetti");
    			attr_dev(canvas, "aria-label", "Falling confetti");
    			add_location(canvas, file$1, 98, 0, 1823);
    			attr_dev(footer, "class", "svelte-1j1esbc");
    			add_location(footer, file$1, 100, 0, 1879);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, h1);
    			append_dev(header, t1);
    			append_dev(header, h4);
    			append_dev(header, t3);
    			append_dev(header, p);
    			append_dev(p, t4);
    			append_dev(p, a0);
    			append_dev(p, t6);
    			append_dev(p, a1);
    			append_dev(p, t8);
    			append_dev(p, a2);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, canvas, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, footer, anchor);
    			mount_component(button, footer, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button_changes = {};
    			if (dirty & /*nextStep*/ 1) button_changes.handleClick = /*nextStep*/ ctx[0];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(canvas);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(footer);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { nextStep } = $$props;
    	onMount(() => new CanvasAnimation(document.getElementById("confetti"), 0.12, "#95dbb7"));
    	const writable_props = ["nextStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Home", $$slots, []);

    	$$self.$set = $$props => {
    		if ("nextStep" in $$props) $$invalidate(0, nextStep = $$props.nextStep);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		CanvasAnimation,
    		Button,
    		nextStep
    	});

    	$$self.$inject_state = $$props => {
    		if ("nextStep" in $$props) $$invalidate(0, nextStep = $$props.nextStep);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nextStep];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { nextStep: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*nextStep*/ ctx[0] === undefined && !("nextStep" in props)) {
    			console.warn("<Home> was created without expected prop 'nextStep'");
    		}
    	}

    	get nextStep() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextStep(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * @see https://gist.github.com/aduh95/65b9400953f7d5f1cc4903897a2f0496
     */

    const COEFFICIENT_DATABASE = [
      {
        min: 0,
        max: 30,
        aGradient: 0.007622554,
        aIntercept: -0.223522909,
        bGradient: -0.006972816,
        bIntercept: 0.159400333,
      },
      {
        min: 30,
        max: 60,
        aGradient: 0.003800316,
        aIntercept: -0.125796416,
        bGradient: -0.002237613,
        bIntercept: 0.044251669,
      },
      {
        min: 60,
        max: 90,
        aGradient: -0.000978743,
        aIntercept: 0.157473997,
        bGradient: 0.000476455,
        bIntercept: -0.115588066,
      },
      {
        min: 90,
        max: 120,
        aGradient: -0.000896412,
        aIntercept: 0.149120725,
        bGradient: 0.000316902,
        bIntercept: -0.100832758,
      },
      {
        min: 120,
        max: 150,
        aGradient: 0.000304561,
        aIntercept: 0.005848966,
        bGradient: -0.000110541,
        bIntercept: -0.049997044,
      },
      {
        min: 150,
        max: 180,
        aGradient: 0.000375923,
        aIntercept: -0.004854929,
        bGradient: -0.000138959,
        bIntercept: -0.029084065,
      },
      {
        min: 180,
        max: 210,
        aGradient: -0.003984596,
        aIntercept: 0.778812054,
        bGradient: 0.002196531,
        bIntercept: -0.452163624,
      },
      {
        min: 210,
        max: 240,
        aGradient: -0.005585318,
        aIntercept: 1.120966131,
        bGradient: 0.006121434,
        bIntercept: -1.240756882,
      },
      {
        min: 240,
        max: 270,
        aGradient: -0.000135415,
        aIntercept: -0.17221474,
        bGradient: 0,
        bIntercept: 0.21,
      },
      {
        min: 270,
        max: 300,
        aGradient: 0.001179809,
        aIntercept: -0.542348823,
        bGradient: 0,
        bIntercept: 0.21,
      },
      {
        min: 300,
        max: 360,
        aGradient: -0.001044457,
        aIntercept: 0.133977501,
        bGradient: 0.001918519,
        bIntercept: -0.43519087,
      },
    ];
    /**
     * Computes the maximum luminosity you can display white text on to meet the
     * WACG contrast ratio requirements.
     * @param {number} hue in unit turn
     * @param {number} saturation between 0 and 1
     * @returns {number} luminosity between 0 and 1
     */
    function computeLuminosityLimit(hue, saturation) {
      hue = (hue % 1) * 360; // converting hue to degrees
      const {
        aGradient,
        aIntercept,
        bGradient,
        bIntercept,
      } = COEFFICIENT_DATABASE.find(({ min, max }) => max >= hue && min <= hue);
      const a = aGradient * hue + aIntercept;
      const b = bGradient * hue + bIntercept;
      const c = 0.34806606292724607;

      return a * saturation * saturation + b * saturation + c;
    }

    function* generateHue(hueAngle = Math.random()) {
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      while (true) yield (hueAngle += goldenRatio);
    }

    const hueGenerator = generateHue();

    function generateRandomColor$2() {
      const hue = hueGenerator.next().value;
      const saturation = Math.random() * 0.7 + 0.3;
      const luminosity = computeLuminosityLimit(hue, saturation);
      return `hsl(${hue}turn,${saturation * 100}%,${luminosity * 100}%)`;
    }

    class Item {
      constructor(label) {
        this._color = generateRandomColor$2();
        this.label = label;
      }

      get color() {
        return this._color;
      }
    }

    /* src/ListMaker.svelte generated by Svelte v3.20.1 */
    const file$2 = "src/ListMaker.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (111:4) {#each items as item, index}
    function create_each_block(ctx) {
    	let div;
    	let input0;
    	let t;
    	let input1;
    	let div_aria_label_value;
    	let div_style_value;
    	let dispose;

    	function input1_input_handler() {
    		/*input1_input_handler*/ ctx[6].call(input1, /*item*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input0 = element("input");
    			t = space();
    			input1 = element("input");
    			attr_dev(input0, "type", "button");
    			input0.value = "x";
    			attr_dev(input0, "title", "Delete entry");
    			attr_dev(input0, "class", "svelte-gzzxwe");
    			add_location(input0, file$2, 117, 8, 2394);
    			attr_dev(input1, "aria-label", "Describe the item");
    			input1.required = true;
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "svelte-gzzxwe");
    			add_location(input1, file$2, 122, 8, 2526);
    			attr_dev(div, "role", "group");
    			attr_dev(div, "aria-label", div_aria_label_value = `Item #${/*index*/ ctx[9] + 1}`);
    			attr_dev(div, "style", div_style_value = `--bg-color:${/*item*/ ctx[7].color}`);
    			attr_dev(div, "class", "svelte-gzzxwe");
    			add_location(div, file$2, 113, 6, 2274);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input0);
    			append_dev(div, t);
    			append_dev(div, input1);
    			set_input_value(input1, /*item*/ ctx[7].label);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "click", /*deleteItem*/ ctx[2](/*index*/ ctx[9]), false, false, false),
    				listen_dev(input1, "input", input1_input_handler)
    			];
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*items*/ 1 && input1.value !== /*item*/ ctx[7].label) {
    				set_input_value(input1, /*item*/ ctx[7].label);
    			}

    			if (dirty & /*items*/ 1 && div_style_value !== (div_style_value = `--bg-color:${/*item*/ ctx[7].color}`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(111:4) {#each items as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let form;
    	let t0;
    	let fieldset;
    	let input;
    	let t1;
    	let footer;
    	let current;
    	let dispose;
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const button = new Button({
    			props: { text: "Go", type: "submit" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			form = element("form");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			fieldset = element("fieldset");
    			input = element("input");
    			t1 = space();
    			footer = element("footer");
    			create_component(button.$$.fragment);
    			attr_dev(input, "placeholder", "Add something");
    			input.autofocus = true;
    			attr_dev(input, "class", "svelte-gzzxwe");
    			add_location(input, file$2, 131, 6, 2783);
    			attr_dev(fieldset, "aria-label", "Add new element to the list");
    			attr_dev(fieldset, "class", "svelte-gzzxwe");
    			add_location(fieldset, file$2, 129, 4, 2681);
    			attr_dev(footer, "class", "svelte-gzzxwe");
    			add_location(footer, file$2, 134, 4, 2874);
    			attr_dev(form, "class", "svelte-gzzxwe");
    			add_location(form, file$2, 109, 2, 2052);
    			attr_dev(main, "class", "svelte-gzzxwe");
    			add_location(main, file$2, 108, 0, 2043);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, main, anchor);
    			append_dev(main, form);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(form, null);
    			}

    			append_dev(form, t0);
    			append_dev(form, fieldset);
    			append_dev(fieldset, input);
    			append_dev(form, t1);
    			append_dev(form, footer);
    			mount_component(button, footer, null);
    			current = true;
    			input.focus();
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "input", /*addNewItem*/ ctx[1], false, false, false),
    				listen_dev(form, "submit", /*handleSubmit*/ ctx[3], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items, deleteItem*/ 5) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(form, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			destroy_component(button);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { items } = $$props, { nextStep } = $$props;
    	let antiRebound = 0;

    	function addNewItem(e) {
    		if (antiRebound === 0) {
    			const item = new Item(e.target.value);
    			$$invalidate(0, items[items.length] = item, items);

    			antiRebound = requestAnimationFrame(() => {
    				const newInputElement = e.target.form.querySelector("div:last-of-type>input:last-child");
    				item.label = e.target.value;
    				e.target.value = "";
    				antiRebound = 0;
    				newInputElement.focus();
    			});
    		}
    	}

    	function deleteItem(i) {
    		return e => {
    			const [item] = items.splice(i, 1);
    			$$invalidate(0, items);
    		};
    	}

    	function handleSubmit(e) {
    		e.preventDefault();

    		if (items.length < 2) {
    			const input = e.target.querySelector("fieldset:first-of-type>input");
    			input.required = true;

    			input.addEventListener(
    				"input",
    				() => {
    					input.required = false;
    				},
    				{ passive: true, once: true }
    			);

    			e.target.reportValidity();
    		} else {
    			nextStep();
    		}
    	}

    	const writable_props = ["items", "nextStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ListMaker> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ListMaker", $$slots, []);

    	function input1_input_handler(item) {
    		item.label = this.value;
    		$$invalidate(0, items);
    	}

    	$$self.$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("nextStep" in $$props) $$invalidate(4, nextStep = $$props.nextStep);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Item,
    		items,
    		nextStep,
    		antiRebound,
    		addNewItem,
    		deleteItem,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("nextStep" in $$props) $$invalidate(4, nextStep = $$props.nextStep);
    		if ("antiRebound" in $$props) antiRebound = $$props.antiRebound;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		items,
    		addNewItem,
    		deleteItem,
    		handleSubmit,
    		nextStep,
    		antiRebound,
    		input1_input_handler
    	];
    }

    class ListMaker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { items: 0, nextStep: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListMaker",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*items*/ ctx[0] === undefined && !("items" in props)) {
    			console.warn("<ListMaker> was created without expected prop 'items'");
    		}

    		if (/*nextStep*/ ctx[4] === undefined && !("nextStep" in props)) {
    			console.warn("<ListMaker> was created without expected prop 'nextStep'");
    		}
    	}

    	get items() {
    		throw new Error("<ListMaker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<ListMaker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nextStep() {
    		throw new Error("<ListMaker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextStep(value) {
    		throw new Error("<ListMaker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

    function polarToCartesian(centerX, centerY, radius, angleInRadians) {
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    }

    function describeArc(x, y, radius, startAngle, endAngle) {
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = Number((endAngle - startAngle) % 360 > 180);

      var d = [
        "M",
        start.x,
        start.y,

        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
      ].join(" ");

      return d;
    }

    function createSplitCircle(diameter, colors) {
      const svg = document.createElementNS(SVG_NAMESPACE, "svg");
      svg.setAttribute("height", diameter);
      svg.setAttribute("width", diameter);

      const angle = (2 * Math.PI) / colors.length;
      svg.append(
        ...colors.map((color, i) => {
          const path = document.createElementNS(SVG_NAMESPACE, "path");
          path.setAttribute(
            "d",
            describeArc(
              diameter / 2,
              diameter / 2,
              diameter / 4,
              angle * i,
              angle * (i + 1)
            )
          );
          path.setAttribute("stroke-width", diameter / 2);
          path.setAttribute("stroke", color);
          path.setAttribute("fill", "none");
          return path;
        })
      );
      return svg;
    }

    if (undefined) {
      let svgElement = document.body.appendChild(
        document.createComment("SVG here")
      );
      let i = 0;
      function update$1() {
        svgElement.replaceWith(
          (svgElement = createSplitCircle(
            100,
            Array.from({ length: ++i }, generateRandomColor)
          ))
        );
      }
      setInterval(update$1, 30);
    }

    /* src/RollTheDice.svelte generated by Svelte v3.20.1 */
    const file$3 = "src/RollTheDice.svelte";

    function create_fragment$3(ctx) {
    	let main;

    	const block = {
    		c: function create() {
    			main = element("main");
    			attr_dev(main, "class", "svelte-109jkpb");
    			add_location(main, file$3, 95, 0, 2360);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { items } = $$props, { nextStep } = $$props;

    	const findWinner = angle => {
    		const { length } = items;
    		const equivalentAngle = 0.75 - angle % 1;
    		return items[(Math.floor(equivalentAngle * length) + length) % length];
    	};

    	onMount(() => {
    		const circle = createSplitCircle(Math.min(window.innerHeight, window.innerWidth) * 0.9, items.map(item => item.color));
    		circle.setAttribute("aria-label", "Rolling wheel");

    		for (const child of circle.children) {
    			child.setAttribute("role", "presentation");
    		}

    		document.querySelector("main").append(circle);
    		const pick = Math.random() * 9;
    		const finalRotation = `rotate(${5 + pick}turn)`;
    		const delay = 1000 + Math.random() * 1000;
    		const duration = 6000 + Math.random() * 1000;
    		const easing = "cubic-bezier(0, 0, 0.001, 1.01)";
    		const delayAfterWhellStop = 300 + Math.random() * 1000;

    		if (Element.prototype.animate) {
    			const animation = circle.animate({ transform: ["none", finalRotation] }, { delay, duration, easing });

    			animation.addEventListener("finish", () => {
    				circle.style.transform = finalRotation;

    				setTimeout(
    					() => {
    						nextStep(findWinner(pick));
    					},
    					delayAfterWhellStop
    				);
    			});
    		} else {
    			circle.style.transition = `transform ${duration}ms ${easing}`;

    			setTimeout(
    				() => {
    					circle.style.transform = finalRotation;
    				},
    				delay
    			);

    			circle.addEventListener("transitionend", () => {
    				setTimeout(
    					() => {
    						nextStep(findWinner(pick));
    					},
    					delayAfterWhellStop
    				);
    			});
    		}
    	});

    	const writable_props = ["items", "nextStep"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<RollTheDice> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("RollTheDice", $$slots, []);

    	$$self.$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("nextStep" in $$props) $$invalidate(1, nextStep = $$props.nextStep);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createSplitCircle,
    		items,
    		nextStep,
    		findWinner
    	});

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("nextStep" in $$props) $$invalidate(1, nextStep = $$props.nextStep);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, nextStep];
    }

    class RollTheDice extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { items: 0, nextStep: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RollTheDice",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*items*/ ctx[0] === undefined && !("items" in props)) {
    			console.warn("<RollTheDice> was created without expected prop 'items'");
    		}

    		if (/*nextStep*/ ctx[1] === undefined && !("nextStep" in props)) {
    			console.warn("<RollTheDice> was created without expected prop 'nextStep'");
    		}
    	}

    	get items() {
    		throw new Error("<RollTheDice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<RollTheDice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nextStep() {
    		throw new Error("<RollTheDice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextStep(value) {
    		throw new Error("<RollTheDice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/CelebrateWinner.svelte generated by Svelte v3.20.1 */
    const file$4 = "src/CelebrateWinner.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let h2;
    	let t0_value = /*winner*/ ctx[1].label + "";
    	let t0;
    	let t1;
    	let audio;
    	let source0;
    	let source0_src_value;
    	let source1;
    	let source1_src_value;
    	let t2;
    	let t3;
    	let button0;
    	let svg;
    	let path;
    	let t4;
    	let canvas;
    	let t5;
    	let footer;
    	let current;
    	let dispose;

    	const button1 = new Button({
    			props: {
    				handleClick: /*nextStep*/ ctx[0],
    				text: "Restart",
    				autofocus: true,
    				style: "--bg-color:#fff"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			audio = element("audio");
    			source0 = element("source");
    			source1 = element("source");
    			t2 = text("\n    Your browser does not support this audio format.");
    			t3 = space();
    			button0 = element("button");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t4 = space();
    			canvas = element("canvas");
    			t5 = space();
    			footer = element("footer");
    			create_component(button1.$$.fragment);
    			attr_dev(h2, "class", "svelte-5tfg1a");
    			add_location(h2, file$4, 93, 2, 1813);
    			if (source0.src !== (source0_src_value = "cheer.mp3")) attr_dev(source0, "src", source0_src_value);
    			attr_dev(source0, "type", "audio/mpeg");
    			add_location(source0, file$4, 95, 4, 1871);
    			if (source1.src !== (source1_src_value = "cheer.ogg")) attr_dev(source1, "src", source1_src_value);
    			attr_dev(source1, "type", "audio/ogg");
    			add_location(source1, file$4, 96, 4, 1920);
    			attr_dev(audio, "id", "cheer");
    			audio.autoplay = true;
    			add_location(audio, file$4, 94, 2, 1839);
    			attr_dev(path, "fill", "currentColor");
    			attr_dev(path, "d", "M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74\n        24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47\n        40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64\n        256l45.64-45.64c6.3-6.3 6.3-16.52\n        0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416\n        210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3\n        16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82\n        22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3\n        22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z");
    			add_location(path, file$4, 105, 6, 2207);
    			attr_dev(svg, "aria-hidden", "true");
    			attr_dev(svg, "data-icon", "volume-mute");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 512 512");
    			add_location(svg, file$4, 100, 4, 2071);
    			button0.hidden = true;
    			attr_dev(button0, "class", "svelte-5tfg1a");
    			add_location(button0, file$4, 99, 2, 2030);
    			attr_dev(main, "class", "svelte-5tfg1a");
    			add_location(main, file$4, 92, 0, 1804);
    			attr_dev(canvas, "id", "confetti");
    			attr_dev(canvas, "aria-label", "Falling confetti");
    			add_location(canvas, file$4, 120, 0, 2892);
    			attr_dev(footer, "class", "svelte-5tfg1a");
    			add_location(footer, file$4, 122, 0, 2948);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(h2, t0);
    			append_dev(main, t1);
    			append_dev(main, audio);
    			append_dev(audio, source0);
    			append_dev(audio, source1);
    			append_dev(audio, t2);
    			append_dev(main, t3);
    			append_dev(main, button0);
    			append_dev(button0, svg);
    			append_dev(svg, path);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, canvas, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, footer, anchor);
    			mount_component(button1, footer, null);
    			current = true;
    			if (remount) dispose();
    			dispose = listen_dev(button0, "click", muteAudio, false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*winner*/ 2) && t0_value !== (t0_value = /*winner*/ ctx[1].label + "")) set_data_dev(t0, t0_value);
    			const button1_changes = {};
    			if (dirty & /*nextStep*/ 1) button1_changes.handleClick = /*nextStep*/ ctx[0];
    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(canvas);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(footer);
    			destroy_component(button1);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function muteAudio() {
    	document.getElementById("cheer").remove();
    	this.remove();
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { nextStep } = $$props;
    	let { winner } = $$props;

    	onMount(() => {
    		new CanvasAnimation(document.getElementById("confetti"), 0.66);
    		document.documentElement.style.setProperty("--bg-color", winner.color);

    		document.getElementById("cheer").addEventListener("canplaythrough", ev => {
    			if (ev.target.paused) {
    				// If browser has disabled autoplay
    				muteAudio.call(ev.target.nextElementSibling);
    			} else {
    				ev.target.nextElementSibling.hidden = false;
    			}
    		});

    		document.getElementById("cheer").addEventListener("ended", ev => {
    			muteAudio.call(ev.target.nextElementSibling);
    		});
    	});

    	const writable_props = ["nextStep", "winner"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CelebrateWinner> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("CelebrateWinner", $$slots, []);

    	$$self.$set = $$props => {
    		if ("nextStep" in $$props) $$invalidate(0, nextStep = $$props.nextStep);
    		if ("winner" in $$props) $$invalidate(1, winner = $$props.winner);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		CanvasAnimation,
    		Button,
    		nextStep,
    		winner,
    		muteAudio
    	});

    	$$self.$inject_state = $$props => {
    		if ("nextStep" in $$props) $$invalidate(0, nextStep = $$props.nextStep);
    		if ("winner" in $$props) $$invalidate(1, winner = $$props.winner);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [nextStep, winner];
    }

    class CelebrateWinner extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { nextStep: 0, winner: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CelebrateWinner",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*nextStep*/ ctx[0] === undefined && !("nextStep" in props)) {
    			console.warn("<CelebrateWinner> was created without expected prop 'nextStep'");
    		}

    		if (/*winner*/ ctx[1] === undefined && !("winner" in props)) {
    			console.warn("<CelebrateWinner> was created without expected prop 'winner'");
    		}
    	}

    	get nextStep() {
    		throw new Error("<CelebrateWinner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nextStep(value) {
    		throw new Error("<CelebrateWinner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get winner() {
    		throw new Error("<CelebrateWinner>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set winner(value) {
    		throw new Error("<CelebrateWinner>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.20.1 */

    // (41:32) 
    function create_if_block_3(ctx) {
    	let current;

    	const celebratewinner = new CelebrateWinner({
    			props: {
    				winner: /*state*/ ctx[0].winner,
    				nextStep: /*backToItemScreen*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(celebratewinner.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(celebratewinner, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const celebratewinner_changes = {};
    			if (dirty & /*state*/ 1) celebratewinner_changes.winner = /*state*/ ctx[0].winner;
    			celebratewinner.$set(celebratewinner_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(celebratewinner.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(celebratewinner.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(celebratewinner, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(41:32) ",
    		ctx
    	});

    	return block;
    }

    // (39:28) 
    function create_if_block_2(ctx) {
    	let current;

    	const rollthedice = new RollTheDice({
    			props: {
    				items: /*items*/ ctx[1],
    				nextStep: /*switchToWinScreen*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(rollthedice.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(rollthedice, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rollthedice.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rollthedice.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(rollthedice, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(39:28) ",
    		ctx
    	});

    	return block;
    }

    // (37:26) 
    function create_if_block_1(ctx) {
    	let current;

    	const listmaker = new ListMaker({
    			props: {
    				items: /*items*/ ctx[1],
    				nextStep: /*switchToRollTheDice*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(listmaker.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(listmaker, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(listmaker.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(listmaker.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(listmaker, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(37:26) ",
    		ctx
    	});

    	return block;
    }

    // (35:0) {#if state.home}
    function create_if_block(ctx) {
    	let current;

    	const home = new Home({
    			props: {
    				nextStep: /*switchToFillItemScreen*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(35:0) {#if state.home}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_if_block_3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*state*/ ctx[0].home) return 0;
    		if (/*state*/ ctx[0].fillItems) return 1;
    		if (/*state*/ ctx[0].rollTheDice) return 2;
    		if (/*state*/ ctx[0].celebrateWinner) return 3;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { state } = $$props;
    	const items = [];

    	function switchToFillItemScreen() {
    		$$invalidate(0, state.home = false, state);
    		$$invalidate(0, state.fillItems = true, state);
    	}

    	function switchToRollTheDice() {
    		$$invalidate(0, state.fillItems = false, state);
    		$$invalidate(0, state.rollTheDice = true, state);
    	}

    	function switchToWinScreen(winner) {
    		$$invalidate(0, state.rollTheDice = false, state);
    		$$invalidate(0, state.celebrateWinner = true, state);
    		$$invalidate(0, state.winner = winner, state);
    	}

    	function backToItemScreen() {
    		$$invalidate(0, state.celebrateWinner = false, state);
    		items.splice(0, items.length);
    		$$invalidate(0, state.fillItems = true, state);
    		document.documentElement.style.removeProperty("--bg-color");
    	}

    	const writable_props = ["state"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$set = $$props => {
    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
    	};

    	$$self.$capture_state = () => ({
    		Home,
    		ListMaker,
    		RollTheDice,
    		CelebrateWinner,
    		state,
    		items,
    		switchToFillItemScreen,
    		switchToRollTheDice,
    		switchToWinScreen,
    		backToItemScreen
    	});

    	$$self.$inject_state = $$props => {
    		if ("state" in $$props) $$invalidate(0, state = $$props.state);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		state,
    		items,
    		switchToFillItemScreen,
    		switchToRollTheDice,
    		switchToWinScreen,
    		backToItemScreen
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { state: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*state*/ ctx[0] === undefined && !("state" in props)) {
    			console.warn("<App> was created without expected prop 'state'");
    		}
    	}

    	get state() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    console.info('Service worker installation disabled by configuration.');

    const app = new App({
      target: document.body,
      props: {
        state: { home: true },
      },
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
