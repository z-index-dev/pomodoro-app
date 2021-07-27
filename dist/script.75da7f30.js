// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// DOM Selectors
// Timer
var status = document.querySelector('.status');
var timerDOM = document.querySelector('.timer');
var workTime = document.getElementById('work-time');
var breakTime = document.getElementById('break-time');
var startBtn = document.querySelector('.start');
var resetBtn = document.querySelector('.reset');

var durationBtns = _toConsumableArray(document.querySelectorAll('.duration-btn'));

var workPlus = document.querySelector('.work-plus');
var workMinus = document.querySelector('.work-minus');
var breakPlus = document.querySelector('.break-plus');
var breakMinus = document.querySelector('.break-minus'); // Initial Timer Variables

var countdown = 0;
var seconds = 1500;
var workMinutes = 25;
var breakMinutes = 5;
var isBreak = true;
var isPaused = true;
var increment = 5; // To-Do Items

var todoForm = document.querySelector('.to-do-form');
var todoInput = document.querySelector('.to-do-input');
var addTaskBtn = document.querySelector('.add-task');
var taskList = document.querySelector('.task-list');

var tasks = _toConsumableArray(document.querySelectorAll('.task'));

var todoArray = []; // Create alarm element

var alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0

alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"); // Duration display matches settings

setDurationDisplay(); // Duration display function

function setDurationDisplay() {
  workTime.innerText = "".concat(workMinutes);
  breakTime.innerText = "".concat(breakMinutes);
} // Timer function


function timer() {
  seconds--;

  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play(); // seconds = (isBreak ? breakMinutes : workMinutes) * 60;

    if (isBreak === true) {
      seconds = breakMinutes * 60;
    } else {
      seconds = workMinutes * 60;
    } // This is switching the value of isBreak between true and false


    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }

  updateTimerDisplay();
}

; // Display countdown

function updateTimerDisplay() {
  var remainingMinutes = Math.floor(seconds / 60 % 60);
  var remainingSeconds = seconds % 60;
  timerDOM.innerHTML = "".concat(remainingMinutes, ":").concat(remainingSeconds < 10 ? '0' : '').concat(remainingSeconds);
}

; // Update start button

function updateStartBtn() {
  if (isPaused && countdown === 0) {
    startBtn.classList.remove('pause');
    startBtn.classList.add('play');
    startBtn.innerText = 'Start';
  } else if (isPaused && countdown !== 0) {
    startBtn.classList.remove('pause');
    startBtn.classList.add('play');
    startBtn.innerText = 'Continue';
  } else {
    startBtn.classList.remove('play');
    startBtn.classList.add('pause');
    startBtn.innerText = 'Pause';
  }
}

; // Increment function

function changeIncrement(button) {
  if (button.classList.contains('work-plus') && workMinutes <= 115) {
    workMinutes += increment;
    console.log(workMinutes);
  } else if (button.classList.contains('work-minus') && workMinutes >= 5) {
    workMinutes -= increment;
    console.log(workMinutes);
  } else if (button.classList.contains('break-plus') && breakMinutes < workMinutes / 2) {
    breakMinutes += increment;
    console.log(breakMinutes);
  } else if (button.classList.contains('break-minus') && breakMinutes >= 5) {
    breakMinutes -= increment;
    console.log(breakMinutes);
  }

  updateTimerDisplay();
  resetTimer();
  setDurationDisplay();
}

; // Reset function

function resetTimer() {
  clearInterval(countdown);
  isPaused = true;
  isBreak = true;
  countdown = 0;
  seconds = workMinutes * 60;
  updateTimerDisplay();
  updateStartBtn();
} // Add Task


function addTask(item) {
  if (item !== '') {
    var todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todoArray.push(todo);
    addToLocalStorage(todoArray);
  }

  todoInput.value = '';
}

; // Display Tasks

function displayTasks(tasks) {
  // Clear out everything inside the ul
  taskList.innerHTML = ''; // Loop through the todoArray

  tasks.forEach(function (task) {
    var checked = task.completed ? 'completed' : null; // Create list element

    var li = document.createElement('li');
    li.setAttribute('class', 'task');
    li.setAttribute('data-key', task.id); // If item is completed, add class of completed - haven't added styling for this yet

    if (task.completed === true) {
      li.classList.add('completed');
    }

    li.innerHTML = "\n      <input type=\"checkbox\" id=\"".concat(task.id, "\" ").concat(checked, ">\n      <label for=\"").concat(task.id, "\">").concat(task.name, "</label>\n      <button class=\"delete-btn\">&times;</button>\n    "); // Append list item

    taskList.append(li);
  });
}

; // Add to-do list to localStorage

function addToLocalStorage(tasks) {
  // conver the array to string then store it.
  localStorage.setItem('tasks', JSON.stringify(tasks)); // render them to screen

  displayTasks(todoArray);
} // Retrieve items from localStorage


function getFromLocalStorage() {
  var reference = localStorage.getItem('tasks');

  if (reference) {
    todoArray = JSON.parse(reference);
    displayTasks(todoArray);
  }
}

; // Toggle completed class on list item

function toggleCompleted(id) {
  todoArray.forEach(function (task) {
    if (task.id == id) {
      // toggle the value
      task.completed = !task.completed;
    }
  });
  addToLocalStorage(todoArray);
} // Delete task


function deleteTask(id) {
  todoArray = todoArray.filter(function (task) {
    return task.id != id;
  });
  addToLocalStorage(todoArray);
} // Immediately call getFromLocalStorage()


getFromLocalStorage(); // Timer Event Listeners

startBtn.addEventListener('click', function () {
  clearInterval(countdown);
  isPaused = !isPaused;

  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }

  updateStartBtn();
});
resetBtn.addEventListener('click', function () {
  return resetTimer();
});
durationBtns.forEach(function (button) {
  button.addEventListener('click', function (e) {
    changeIncrement(e.currentTarget);
  });
}); // To-Do List Event Listeners

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask(todoInput.value);
});
taskList.addEventListener('click', function (e) {
  // Check if the event is on the label
  if (event.target.type === 'checkbox') {
    toggleCompleted(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-btn')) {
    deleteTask(event.target.parentElement.getAttribute('data-key'));
  }
});
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55971" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map