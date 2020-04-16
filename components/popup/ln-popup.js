// Usage:
//<a href="#"
//	ln-popup="POPUPOPTIONS"
//	ln-popup-center="true" //optional
//>
// POPUPOPTIONS = "width=300,height=300,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
// (https://javascript.info/popup-windows)

(function(){ 
	const DOM_SELECTOR = 'ln-popup';
	const DOM_ATTRIBUTE = 'lnPopup';

	let _target = null;

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		this._event = null;

		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items = domRoot.querySelectorAll('[' + DOM_SELECTOR + ']') || [];

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(dom);
		}

		items.forEach(function(item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		})
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					console.log(mutation.addedNodes);
					mutation.addedNodes.forEach(function(item) {
						_constructor(item);
					})
				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();


	// function _setObserver() {
	// 	let thiz = this;
	// 	// http://help.dottoro.com/ljdchxcl.php
	// 	// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events

	// 	var observer = new MutationObserver(function(mutations) {
	// 		mutations.forEach(function(mutation) {
	// 			if (mutation.type == "attributes") {
	// 				console.log(mutation);
	// 				_getOptions.call(thiz, mutation);
	// 			}
	// 		});
	// 	});

	// 	observer.observe(this.dom, {
	// 		attributes: true //configure it to listen to attribute changes
	// 	});
	// }

	
	// Edit Below

	function _init() {
		let thiz = this;
		this.dom.onclick = function(event) {
			event = event || window.event;
			event.preventDefault();
			
			_target = event.target;
			console.log(_target);

			window.open(_target.href, _target.target, _handleParams.call(this));
			_target = null;
			return false;
		};
		return this;
	}

	function _handleParams() {
		console.log(_target);
		if (!_shouldCenter.call(this)) {
			return _target.getAttribute('ln-popup');
		}

		options = _parseParams.call(this);

		options.left = Math.round((screen.width - options.width) / 2);
		options.top = Math.round((screen.height - options.height) / 2);

		return _joinToString(options)
	}

	function _shouldCenter() {
		return (_target.getAttribute('ln-popup-center') == "true" ? true : false);
	}
	function _parseParams() {
		let options = {};

		_target.getAttribute('ln-popup').split(',').forEach(function(item) {
			const values = item.split('=');
			options[values[0]] = values[1];
		})
		return options;
	}
	function _joinToString(options) {
		result = [];
		for(let item in options) {
			console.log(item);
			result.push(item + '=' + options[item]);
		}
		return result.join(',');
	}


	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnPopup globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
})();

window.lnPopup(document.body);
