webpackJsonp([0],{

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_jquery_ghosthunter__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_jquery_ghosthunter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assets_jquery_ghosthunter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history__ = __webpack_require__(1);





$(function () {
  const $searchBox = $('#J-search-box');
  const $searchInput = $searchBox.find('.J-input-search');
  const $results = $('#J-search-results');
  let $searchResultItems;

  $searchInput.ghostHunter({
    results: '#J-search-results',
    info_template: `<div class="search-results-amount"><div class="light"><b>{{amount}}</b> posts found</div></div>`,
    result_template: `
      <a href="{{link}}" data-id="{{id}}" class="search-result-item J-search-result-item" title="{{title}}">
        <h3>{{title}}</h3>
        <div class="lighter">{{pubDate}}</div>
      </a>
    `,
    onComplete: results => {
      $searchResultItems = $searchBox.find('.J-search-result-item');
      const pathname = location.pathname;
      $searchResultItems.each(function () {
        const $this = $(this);
        $this.attr('href') === pathname && $this.addClass('active');
      });
    }
  });

  $searchBox.on('click', '.J-search-result-item', function (e) {
    const $this = $(this);
    if (Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* isPostPage */])()) {
      e.preventDefault();

      const id = $this.data('id');
      const url = $this.attr('href');
      emitter.emit('add-post-tab', {
        id,
        url,
        title: $this.attr('title'),
        slug: ''
      });
    }
  }).on('click', '.J-search-clear', function () {
    $searchInput.val('');
    $results.html('');
    $searchInput.focus();
  });

  __WEBPACK_IMPORTED_MODULE_3__history__["a" /* default */].listen(location => {
    const nextTab = location.state;

    $searchResultItems && $searchResultItems.removeClass('active').filter((idx, item) => {
      return $(item).data('id') === nextTab.id;
    }).addClass('active');
  });
});

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * ghostHunter - 0.4.0
 * Copyright (C) 2014 Jamal Neufeld (jamal@i11u.me)
 * MIT Licensed
 * @license
 */
(function ($) {
  /**
   * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.1.5
   * Copyright (C) 2017 Oliver Nightingale
   * @license MIT
   */

  var lunr = function () {
    /**
     * A convenience function for configuring and constructing
     * a new lunr Index.
     *
     * A lunr.Builder instance is created and the pipeline setup
     * with a trimmer, stop word filter and stemmer.
     *
     * This builder object is yielded to the configuration function
     * that is passed as a parameter, allowing the list of fields
     * and other builder parameters to be customised.
     *
     * All documents _must_ be added within the passed config function.
     *
     * @example
     * var idx = lunr(function () {
     *   this.field('title')
     *   this.field('body')
     *   this.ref('id')
     *
     *   documents.forEach(function (doc) {
     *     this.add(doc)
     *   }, this)
     * })
     *
     * @see {@link lunr.Builder}
     * @see {@link lunr.Pipeline}
     * @see {@link lunr.trimmer}
     * @see {@link lunr.stopWordFilter}
     * @see {@link lunr.stemmer}
     * @namespace {function} lunr
     */
    var lunr = function (config) {
      var builder = new lunr.Builder();

      builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

      builder.searchPipeline.add(lunr.stemmer);

      config.call(builder, builder);
      return builder.build();
    };

    lunr.version = "2.1.5";
    /*!
    * lunr.utils
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * A namespace containing utils for the rest of the lunr library
     */
    lunr.utils = {};

    /**
     * Print a warning message to the console.
     *
     * @param {String} message The message to be printed.
     * @memberOf Utils
     */
    lunr.utils.warn = function (global) {
      /* eslint-disable no-console */
      return function (message) {
        if (global.console && console.warn) {
          console.warn(message);
        }
      };
      /* eslint-enable no-console */
    }(this);

    /**
     * Convert an object to a string.
     *
     * In the case of `null` and `undefined` the function returns
     * the empty string, in all other cases the result of calling
     * `toString` on the passed object is returned.
     *
     * @param {Any} obj The object to convert to a string.
     * @return {String} string representation of the passed object.
     * @memberOf Utils
     */
    lunr.utils.asString = function (obj) {
      if (obj === void 0 || obj === null) {
        return "";
      } else {
        return obj.toString();
      }
    };
    lunr.FieldRef = function (docRef, fieldName, stringValue) {
      this.docRef = docRef;
      this.fieldName = fieldName;
      this._stringValue = stringValue;
    };

    lunr.FieldRef.joiner = "/";

    lunr.FieldRef.fromString = function (s) {
      var n = s.indexOf(lunr.FieldRef.joiner);

      if (n === -1) {
        throw "malformed field ref string";
      }

      var fieldRef = s.slice(0, n),
          docRef = s.slice(n + 1);

      return new lunr.FieldRef(docRef, fieldRef, s);
    };

    lunr.FieldRef.prototype.toString = function () {
      if (this._stringValue == undefined) {
        this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef;
      }

      return this._stringValue;
    };
    /**
     * A function to calculate the inverse document frequency for
     * a posting. This is shared between the builder and the index
     *
     * @private
     * @param {object} posting - The posting for a given term
     * @param {number} documentCount - The total number of documents.
     */
    lunr.idf = function (posting, documentCount) {
      var documentsWithTerm = 0;

      for (var fieldName in posting) {
        if (fieldName == "_index") continue; // Ignore the term index, its not a field
        documentsWithTerm += Object.keys(posting[fieldName]).length;
      }

      var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);

      return Math.log(1 + Math.abs(x));
    };

    /**
     * A token wraps a string representation of a token
     * as it is passed through the text processing pipeline.
     *
     * @constructor
     * @param {string} [str=''] - The string token being wrapped.
     * @param {object} [metadata={}] - Metadata associated with this token.
     */
    lunr.Token = function (str, metadata) {
      this.str = str || "";
      this.metadata = metadata || {};
    };

    /**
     * Returns the token string that is being wrapped by this object.
     *
     * @returns {string}
     */
    lunr.Token.prototype.toString = function () {
      return this.str;
    };

    /**
     * A token update function is used when updating or optionally
     * when cloning a token.
     *
     * @callback lunr.Token~updateFunction
     * @param {string} str - The string representation of the token.
     * @param {Object} metadata - All metadata associated with this token.
     */

    /**
     * Applies the given function to the wrapped string token.
     *
     * @example
     * token.update(function (str, metadata) {
     *   return str.toUpperCase()
     * })
     *
     * @param {lunr.Token~updateFunction} fn - A function to apply to the token string.
     * @returns {lunr.Token}
     */
    lunr.Token.prototype.update = function (fn) {
      this.str = fn(this.str, this.metadata);
      return this;
    };

    /**
     * Creates a clone of this token. Optionally a function can be
     * applied to the cloned token.
     *
     * @param {lunr.Token~updateFunction} [fn] - An optional function to apply to the cloned token.
     * @returns {lunr.Token}
     */
    lunr.Token.prototype.clone = function (fn) {
      fn = fn || function (s) {
        return s;
      };
      return new lunr.Token(fn(this.str, this.metadata), this.metadata);
    };
    /*!
    * lunr.tokenizer
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * A function for splitting a string into tokens ready to be inserted into
     * the search index. Uses `lunr.tokenizer.separator` to split strings, change
     * the value of this property to change how strings are split into tokens.
     *
     * This tokenizer will convert its parameter to a string by calling `toString` and
     * then will split this string on the character in `lunr.tokenizer.separator`.
     * Arrays will have their elements converted to strings and wrapped in a lunr.Token.
     *
     * @static
     * @param {?(string|object|object[])} obj - The object to convert into tokens
     * @returns {lunr.Token[]}
     */
    lunr.tokenizer = function (obj) {
      if (obj == null || obj == undefined) {
        return [];
      }

      if (Array.isArray(obj)) {
        return obj.map(function (t) {
          return new lunr.Token(lunr.utils.asString(t).toLowerCase());
        });
      }

      var str = obj.toString().trim().toLowerCase(),
          len = str.length,
          tokens = [];

      for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
        var char = str.charAt(sliceEnd),
            sliceLength = sliceEnd - sliceStart;

        if (char.match(lunr.tokenizer.separator) || sliceEnd == len) {
          if (sliceLength > 0) {
            tokens.push(new lunr.Token(str.slice(sliceStart, sliceEnd), {
              position: [sliceStart, sliceLength],
              index: tokens.length
            }));
          }

          sliceStart = sliceEnd + 1;
        }
      }

      return tokens;
    };

    /**
     * The separator used to split a string into tokens. Override this property to change the behaviour of
     * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
     *
     * @static
     * @see lunr.tokenizer
     */
    lunr.tokenizer.separator = /[\s\-]+/;
    /*!
    * lunr.Pipeline
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * lunr.Pipelines maintain an ordered list of functions to be applied to all
     * tokens in documents entering the search index and queries being ran against
     * the index.
     *
     * An instance of lunr.Index created with the lunr shortcut will contain a
     * pipeline with a stop word filter and an English language stemmer. Extra
     * functions can be added before or after either of these functions or these
     * default functions can be removed.
     *
     * When run the pipeline will call each function in turn, passing a token, the
     * index of that token in the original list of all tokens and finally a list of
     * all the original tokens.
     *
     * The output of functions in the pipeline will be passed to the next function
     * in the pipeline. To exclude a token from entering the index the function
     * should return undefined, the rest of the pipeline will not be called with
     * this token.
     *
     * For serialisation of pipelines to work, all functions used in an instance of
     * a pipeline should be registered with lunr.Pipeline. Registered functions can
     * then be loaded. If trying to load a serialised pipeline that uses functions
     * that are not registered an error will be thrown.
     *
     * If not planning on serialising the pipeline then registering pipeline functions
     * is not necessary.
     *
     * @constructor
     */
    lunr.Pipeline = function () {
      this._stack = [];
    };

    lunr.Pipeline.registeredFunctions = Object.create(null);

    /**
     * A pipeline function maps lunr.Token to lunr.Token. A lunr.Token contains the token
     * string as well as all known metadata. A pipeline function can mutate the token string
     * or mutate (or add) metadata for a given token.
     *
     * A pipeline function can indicate that the passed token should be discarded by returning
     * null. This token will not be passed to any downstream pipeline functions and will not be
     * added to the index.
     *
     * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
     * to any downstream pipeline functions and all will returned tokens will be added to the index.
     *
     * Any number of pipeline functions may be chained together using a lunr.Pipeline.
     *
     * @interface lunr.PipelineFunction
     * @param {lunr.Token} token - A token from the document being processed.
     * @param {number} i - The index of this token in the complete list of tokens for this document/field.
     * @param {lunr.Token[]} tokens - All tokens for this document/field.
     * @returns {(?lunr.Token|lunr.Token[])}
     */

    /**
     * Register a function with the pipeline.
     *
     * Functions that are used in the pipeline should be registered if the pipeline
     * needs to be serialised, or a serialised pipeline needs to be loaded.
     *
     * Registering a function does not add it to a pipeline, functions must still be
     * added to instances of the pipeline for them to be used when running a pipeline.
     *
     * @param {lunr.PipelineFunction} fn - The function to check for.
     * @param {String} label - The label to register this function with
     */
    lunr.Pipeline.registerFunction = function (fn, label) {
      if (label in this.registeredFunctions) {
        lunr.utils.warn("Overwriting existing registered function: " + label);
      }

      fn.label = label;
      lunr.Pipeline.registeredFunctions[fn.label] = fn;
    };

    /**
     * Warns if the function is not registered as a Pipeline function.
     *
     * @param {lunr.PipelineFunction} fn - The function to check for.
     * @private
     */
    lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
      var isRegistered = fn.label && fn.label in this.registeredFunctions;

      if (!isRegistered) {
        lunr.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
      }
    };

    /**
     * Loads a previously serialised pipeline.
     *
     * All functions to be loaded must already be registered with lunr.Pipeline.
     * If any function from the serialised data has not been registered then an
     * error will be thrown.
     *
     * @param {Object} serialised - The serialised pipeline to load.
     * @returns {lunr.Pipeline}
     */
    lunr.Pipeline.load = function (serialised) {
      var pipeline = new lunr.Pipeline();

      serialised.forEach(function (fnName) {
        var fn = lunr.Pipeline.registeredFunctions[fnName];

        if (fn) {
          pipeline.add(fn);
        } else {
          throw new Error("Cannot load unregistered function: " + fnName);
        }
      });

      return pipeline;
    };

    /**
     * Adds new functions to the end of the pipeline.
     *
     * Logs a warning if the function has not been registered.
     *
     * @param {lunr.PipelineFunction[]} functions - Any number of functions to add to the pipeline.
     */
    lunr.Pipeline.prototype.add = function () {
      var fns = Array.prototype.slice.call(arguments);

      fns.forEach(function (fn) {
        lunr.Pipeline.warnIfFunctionNotRegistered(fn);
        this._stack.push(fn);
      }, this);
    };

    /**
     * Adds a single function after a function that already exists in the
     * pipeline.
     *
     * Logs a warning if the function has not been registered.
     *
     * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
     * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
     */
    lunr.Pipeline.prototype.after = function (existingFn, newFn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }

      pos = pos + 1;
      this._stack.splice(pos, 0, newFn);
    };

    /**
     * Adds a single function before a function that already exists in the
     * pipeline.
     *
     * Logs a warning if the function has not been registered.
     *
     * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
     * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
     */
    lunr.Pipeline.prototype.before = function (existingFn, newFn) {
      lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

      var pos = this._stack.indexOf(existingFn);
      if (pos == -1) {
        throw new Error("Cannot find existingFn");
      }

      this._stack.splice(pos, 0, newFn);
    };

    /**
     * Removes a function from the pipeline.
     *
     * @param {lunr.PipelineFunction} fn The function to remove from the pipeline.
     */
    lunr.Pipeline.prototype.remove = function (fn) {
      var pos = this._stack.indexOf(fn);
      if (pos == -1) {
        return;
      }

      this._stack.splice(pos, 1);
    };

    /**
     * Runs the current list of functions that make up the pipeline against the
     * passed tokens.
     *
     * @param {Array} tokens The tokens to run through the pipeline.
     * @returns {Array}
     */
    lunr.Pipeline.prototype.run = function (tokens) {
      var stackLength = this._stack.length;

      for (var i = 0; i < stackLength; i++) {
        var fn = this._stack[i];

        tokens = tokens.reduce(function (memo, token, j) {
          var result = fn(token, j, tokens);

          if (result === void 0 || result === "") return memo;

          return memo.concat(result);
        }, []);
      }

      return tokens;
    };

    /**
     * Convenience method for passing a string through a pipeline and getting
     * strings out. This method takes care of wrapping the passed string in a
     * token and mapping the resulting tokens back to strings.
     *
     * @param {string} str - The string to pass through the pipeline.
     * @returns {string[]}
     */
    lunr.Pipeline.prototype.runString = function (str) {
      var token = new lunr.Token(str);

      return this.run([token]).map(function (t) {
        return t.toString();
      });
    };

    /**
     * Resets the pipeline by removing any existing processors.
     *
     */
    lunr.Pipeline.prototype.reset = function () {
      this._stack = [];
    };

    /**
     * Returns a representation of the pipeline ready for serialisation.
     *
     * Logs a warning if the function has not been registered.
     *
     * @returns {Array}
     */
    lunr.Pipeline.prototype.toJSON = function () {
      return this._stack.map(function (fn) {
        lunr.Pipeline.warnIfFunctionNotRegistered(fn);

        return fn.label;
      });
    };
    /*!
    * lunr.Vector
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * A vector is used to construct the vector space of documents and queries. These
     * vectors support operations to determine the similarity between two documents or
     * a document and a query.
     *
     * Normally no parameters are required for initializing a vector, but in the case of
     * loading a previously dumped vector the raw elements can be provided to the constructor.
     *
     * For performance reasons vectors are implemented with a flat array, where an elements
     * index is immediately followed by its value. E.g. [index, value, index, value]. This
     * allows the underlying array to be as sparse as possible and still offer decent
     * performance when being used for vector calculations.
     *
     * @constructor
     * @param {Number[]} [elements] - The flat list of element index and element value pairs.
     */
    lunr.Vector = function (elements) {
      this._magnitude = 0;
      this.elements = elements || [];
    };

    /**
     * Calculates the position within the vector to insert a given index.
     *
     * This is used internally by insert and upsert. If there are duplicate indexes then
     * the position is returned as if the value for that index were to be updated, but it
     * is the callers responsibility to check whether there is a duplicate at that index
     *
     * @param {Number} insertIdx - The index at which the element should be inserted.
     * @returns {Number}
     */
    lunr.Vector.prototype.positionForIndex = function (index) {
      // For an empty vector the tuple can be inserted at the beginning
      if (this.elements.length == 0) {
        return 0;
      }

      var start = 0,
          end = this.elements.length / 2,
          sliceLength = end - start,
          pivotPoint = Math.floor(sliceLength / 2),
          pivotIndex = this.elements[pivotPoint * 2];

      while (sliceLength > 1) {
        if (pivotIndex < index) {
          start = pivotPoint;
        }

        if (pivotIndex > index) {
          end = pivotPoint;
        }

        if (pivotIndex == index) {
          break;
        }

        sliceLength = end - start;
        pivotPoint = start + Math.floor(sliceLength / 2);
        pivotIndex = this.elements[pivotPoint * 2];
      }

      if (pivotIndex == index) {
        return pivotPoint * 2;
      }

      if (pivotIndex > index) {
        return pivotPoint * 2;
      }

      if (pivotIndex < index) {
        return (pivotPoint + 1) * 2;
      }
    };

    /**
     * Inserts an element at an index within the vector.
     *
     * Does not allow duplicates, will throw an error if there is already an entry
     * for this index.
     *
     * @param {Number} insertIdx - The index at which the element should be inserted.
     * @param {Number} val - The value to be inserted into the vector.
     */
    lunr.Vector.prototype.insert = function (insertIdx, val) {
      this.upsert(insertIdx, val, function () {
        throw "duplicate index";
      });
    };

    /**
     * Inserts or updates an existing index within the vector.
     *
     * @param {Number} insertIdx - The index at which the element should be inserted.
     * @param {Number} val - The value to be inserted into the vector.
     * @param {function} fn - A function that is called for updates, the existing value and the
     * requested value are passed as arguments
     */
    lunr.Vector.prototype.upsert = function (insertIdx, val, fn) {
      this._magnitude = 0;
      var position = this.positionForIndex(insertIdx);

      if (this.elements[position] == insertIdx) {
        this.elements[position + 1] = fn(this.elements[position + 1], val);
      } else {
        this.elements.splice(position, 0, insertIdx, val);
      }
    };

    /**
     * Calculates the magnitude of this vector.
     *
     * @returns {Number}
     */
    lunr.Vector.prototype.magnitude = function () {
      if (this._magnitude) return this._magnitude;

      var sumOfSquares = 0,
          elementsLength = this.elements.length;

      for (var i = 1; i < elementsLength; i += 2) {
        var val = this.elements[i];
        sumOfSquares += val * val;
      }

      return this._magnitude = Math.sqrt(sumOfSquares);
    };

    /**
     * Calculates the dot product of this vector and another vector.
     *
     * @param {lunr.Vector} otherVector - The vector to compute the dot product with.
     * @returns {Number}
     */
    lunr.Vector.prototype.dot = function (otherVector) {
      var dotProduct = 0,
          a = this.elements,
          b = otherVector.elements,
          aLen = a.length,
          bLen = b.length,
          aVal = 0,
          bVal = 0,
          i = 0,
          j = 0;

      while (i < aLen && j < bLen) {
        aVal = a[i], bVal = b[j];
        if (aVal < bVal) {
          i += 2;
        } else if (aVal > bVal) {
          j += 2;
        } else if (aVal == bVal) {
          dotProduct += a[i + 1] * b[j + 1];
          i += 2;
          j += 2;
        }
      }

      return dotProduct;
    };

    /**
     * Calculates the cosine similarity between this vector and another
     * vector.
     *
     * @param {lunr.Vector} otherVector - The other vector to calculate the
     * similarity with.
     * @returns {Number}
     */
    lunr.Vector.prototype.similarity = function (otherVector) {
      return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude());
    };

    /**
     * Converts the vector to an array of the elements within the vector.
     *
     * @returns {Number[]}
     */
    lunr.Vector.prototype.toArray = function () {
      var output = new Array(this.elements.length / 2);

      for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
        output[j] = this.elements[i];
      }

      return output;
    };

    /**
     * A JSON serializable representation of the vector.
     *
     * @returns {Number[]}
     */
    lunr.Vector.prototype.toJSON = function () {
      return this.elements;
    };
    /* eslint-disable */
    /*!
    * lunr.stemmer
    * Copyright (C) 2017 Oliver Nightingale
    * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
    */

    /**
     * lunr.stemmer is an english language stemmer, this is a JavaScript
     * implementation of the PorterStemmer taken from http://tartarus.org/~martin
     *
     * @static
     * @implements {lunr.PipelineFunction}
     * @param {lunr.Token} token - The string to stem
     * @returns {lunr.Token}
     * @see {@link lunr.Pipeline}
     */
    lunr.stemmer = function () {
      var step2list = {
        ational: "ate",
        tional: "tion",
        enci: "ence",
        anci: "ance",
        izer: "ize",
        bli: "ble",
        alli: "al",
        entli: "ent",
        eli: "e",
        ousli: "ous",
        ization: "ize",
        ation: "ate",
        ator: "ate",
        alism: "al",
        iveness: "ive",
        fulness: "ful",
        ousness: "ous",
        aliti: "al",
        iviti: "ive",
        biliti: "ble",
        logi: "log"
      },
          step3list = {
        icate: "ic",
        ative: "",
        alize: "al",
        iciti: "ic",
        ical: "ic",
        ful: "",
        ness: ""
      },
          c = "[^aeiou]",
          // consonant
      v = "[aeiouy]",
          // vowel
      C = c + "[^aeiouy]*",
          // consonant sequence
      V = v + "[aeiou]*",
          // vowel sequence
      mgr0 = "^(" + C + ")?" + V + C,
          // [C]VC... is m>0
      meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",
          // [C]VC[V] is m=1
      mgr1 = "^(" + C + ")?" + V + C + V + C,
          // [C]VCVC... is m>1
      s_v = "^(" + C + ")?" + v; // vowel in stem

      var re_mgr0 = new RegExp(mgr0);
      var re_mgr1 = new RegExp(mgr1);
      var re_meq1 = new RegExp(meq1);
      var re_s_v = new RegExp(s_v);

      var re_1a = /^(.+?)(ss|i)es$/;
      var re2_1a = /^(.+?)([^s])s$/;
      var re_1b = /^(.+?)eed$/;
      var re2_1b = /^(.+?)(ed|ing)$/;
      var re_1b_2 = /.$/;
      var re2_1b_2 = /(at|bl|iz)$/;
      var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
      var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

      var re_1c = /^(.+?[^aeiou])y$/;
      var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

      var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

      var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      var re2_4 = /^(.+?)(s|t)(ion)$/;

      var re_5 = /^(.+?)e$/;
      var re_5_1 = /ll$/;
      var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

      var porterStemmer = function porterStemmer(w) {
        var stem, suffix, firstch, re, re2, re3, re4;

        if (w.length < 3) {
          return w;
        }

        firstch = w.substr(0, 1);
        if (firstch == "y") {
          w = firstch.toUpperCase() + w.substr(1);
        }

        // Step 1a
        re = re_1a;
        re2 = re2_1a;

        if (re.test(w)) {
          w = w.replace(re, "$1$2");
        } else if (re2.test(w)) {
          w = w.replace(re2, "$1$2");
        }

        // Step 1b
        re = re_1b;
        re2 = re2_1b;
        if (re.test(w)) {
          var fp = re.exec(w);
          re = re_mgr0;
          if (re.test(fp[1])) {
            re = re_1b_2;
            w = w.replace(re, "");
          }
        } else if (re2.test(w)) {
          var fp = re2.exec(w);
          stem = fp[1];
          re2 = re_s_v;
          if (re2.test(stem)) {
            w = stem;
            re2 = re2_1b_2;
            re3 = re3_1b_2;
            re4 = re4_1b_2;
            if (re2.test(w)) {
              w = w + "e";
            } else if (re3.test(w)) {
              re = re_1b_2;
              w = w.replace(re, "");
            } else if (re4.test(w)) {
              w = w + "e";
            }
          }
        }

        // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
        re = re_1c;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          w = stem + "i";
        }

        // Step 2
        re = re_2;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w = stem + step2list[suffix];
          }
        }

        // Step 3
        re = re_3;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          suffix = fp[2];
          re = re_mgr0;
          if (re.test(stem)) {
            w = stem + step3list[suffix];
          }
        }

        // Step 4
        re = re_4;
        re2 = re2_4;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          re = re_mgr1;
          if (re.test(stem)) {
            w = stem;
          }
        } else if (re2.test(w)) {
          var fp = re2.exec(w);
          stem = fp[1] + fp[2];
          re2 = re_mgr1;
          if (re2.test(stem)) {
            w = stem;
          }
        }

        // Step 5
        re = re_5;
        if (re.test(w)) {
          var fp = re.exec(w);
          stem = fp[1];
          re = re_mgr1;
          re2 = re_meq1;
          re3 = re3_5;
          if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
            w = stem;
          }
        }

        re = re_5_1;
        re2 = re_mgr1;
        if (re.test(w) && re2.test(w)) {
          re = re_1b_2;
          w = w.replace(re, "");
        }

        // and turn initial Y back to y

        if (firstch == "y") {
          w = firstch.toLowerCase() + w.substr(1);
        }

        return w;
      };

      return function (token) {
        return token.update(porterStemmer);
      };
    }();

    lunr.Pipeline.registerFunction(lunr.stemmer, "stemmer");
    /*!
    * lunr.stopWordFilter
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
     * list of stop words.
     *
     * The built in lunr.stopWordFilter is built using this generator and can be used
     * to generate custom stopWordFilters for applications or non English languages.
     *
     * @param {Array} token The token to pass through the filter
     * @returns {lunr.PipelineFunction}
     * @see lunr.Pipeline
     * @see lunr.stopWordFilter
     */
    lunr.generateStopWordFilter = function (stopWords) {
      var words = stopWords.reduce(function (memo, stopWord) {
        memo[stopWord] = stopWord;
        return memo;
      }, {});

      return function (token) {
        if (token && words[token.toString()] !== token.toString()) return token;
      };
    };

    /**
     * lunr.stopWordFilter is an English language stop word list filter, any words
     * contained in the list will not be passed through the filter.
     *
     * This is intended to be used in the Pipeline. If the token does not pass the
     * filter then undefined will be returned.
     *
     * @implements {lunr.PipelineFunction}
     * @params {lunr.Token} token - A token to check for being a stop word.
     * @returns {lunr.Token}
     * @see {@link lunr.Pipeline}
     */
    lunr.stopWordFilter = lunr.generateStopWordFilter(["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"]);

    lunr.Pipeline.registerFunction(lunr.stopWordFilter, "stopWordFilter");
    /*!
    * lunr.trimmer
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * lunr.trimmer is a pipeline function for trimming non word
     * characters from the beginning and end of tokens before they
     * enter the index.
     *
     * This implementation may not work correctly for non latin
     * characters and should either be removed or adapted for use
     * with languages with non-latin characters.
     *
     * @static
     * @implements {lunr.PipelineFunction}
     * @param {lunr.Token} token The token to pass through the filter
     * @returns {lunr.Token}
     * @see lunr.Pipeline
     */
    lunr.trimmer = function (token) {
      return token.update(function (s) {
        return s.replace(/^\W+/, "").replace(/\W+$/, "");
      });
    };

    lunr.Pipeline.registerFunction(lunr.trimmer, "trimmer");
    /*!
    * lunr.TokenSet
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * A token set is used to store the unique list of all tokens
     * within an index. Token sets are also used to represent an
     * incoming query to the index, this query token set and index
     * token set are then intersected to find which tokens to look
     * up in the inverted index.
     *
     * A token set can hold multiple tokens, as in the case of the
     * index token set, or it can hold a single token as in the
     * case of a simple query token set.
     *
     * Additionally token sets are used to perform wildcard matching.
     * Leading, contained and trailing wildcards are supported, and
     * from this edit distance matching can also be provided.
     *
     * Token sets are implemented as a minimal finite state automata,
     * where both common prefixes and suffixes are shared between tokens.
     * This helps to reduce the space used for storing the token set.
     *
     * @constructor
     */
    lunr.TokenSet = function () {
      this.final = false;
      this.edges = {};
      this.id = lunr.TokenSet._nextId;
      lunr.TokenSet._nextId += 1;
    };

    /**
     * Keeps track of the next, auto increment, identifier to assign
     * to a new tokenSet.
     *
     * TokenSets require a unique identifier to be correctly minimised.
     *
     * @private
     */
    lunr.TokenSet._nextId = 1;

    /**
     * Creates a TokenSet instance from the given sorted array of words.
     *
     * @param {String[]} arr - A sorted array of strings to create the set from.
     * @returns {lunr.TokenSet}
     * @throws Will throw an error if the input array is not sorted.
     */
    lunr.TokenSet.fromArray = function (arr) {
      var builder = new lunr.TokenSet.Builder();

      for (var i = 0, len = arr.length; i < len; i++) {
        builder.insert(arr[i]);
      }

      builder.finish();
      return builder.root;
    };

    /**
     * Creates a token set from a query clause.
     *
     * @private
     * @param {Object} clause - A single clause from lunr.Query.
     * @param {string} clause.term - The query clause term.
     * @param {number} [clause.editDistance] - The optional edit distance for the term.
     * @returns {lunr.TokenSet}
     */
    lunr.TokenSet.fromClause = function (clause) {
      if ("editDistance" in clause) {
        return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
      } else {
        return lunr.TokenSet.fromString(clause.term);
      }
    };

    /**
     * Creates a token set representing a single string with a specified
     * edit distance.
     *
     * Insertions, deletions, substitutions and transpositions are each
     * treated as an edit distance of 1.
     *
     * Increasing the allowed edit distance will have a dramatic impact
     * on the performance of both creating and intersecting these TokenSets.
     * It is advised to keep the edit distance less than 3.
     *
     * @param {string} str - The string to create the token set from.
     * @param {number} editDistance - The allowed edit distance to match.
     * @returns {lunr.Vector}
     */
    lunr.TokenSet.fromFuzzyString = function (str, editDistance) {
      var root = new lunr.TokenSet();

      var stack = [{
        node: root,
        editsRemaining: editDistance,
        str: str
      }];

      while (stack.length) {
        var frame = stack.pop();

        // no edit
        if (frame.str.length > 0) {
          var char = frame.str.charAt(0),
              noEditNode;

          if (char in frame.node.edges) {
            noEditNode = frame.node.edges[char];
          } else {
            noEditNode = new lunr.TokenSet();
            frame.node.edges[char] = noEditNode;
          }

          if (frame.str.length == 1) {
            noEditNode.final = true;
          } else {
            stack.push({
              node: noEditNode,
              editsRemaining: frame.editsRemaining,
              str: frame.str.slice(1)
            });
          }
        }

        // deletion
        // can only do a deletion if we have enough edits remaining
        // and if there are characters left to delete in the string
        if (frame.editsRemaining > 0 && frame.str.length > 1) {
          var char = frame.str.charAt(1),
              deletionNode;

          if (char in frame.node.edges) {
            deletionNode = frame.node.edges[char];
          } else {
            deletionNode = new lunr.TokenSet();
            frame.node.edges[char] = deletionNode;
          }

          if (frame.str.length <= 2) {
            deletionNode.final = true;
          } else {
            stack.push({
              node: deletionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str.slice(2)
            });
          }
        }

        // deletion
        // just removing the last character from the str
        if (frame.editsRemaining > 0 && frame.str.length == 1) {
          frame.node.final = true;
        }

        // substitution
        // can only do a substitution if we have enough edits remaining
        // and if there are characters left to substitute
        if (frame.editsRemaining > 0 && frame.str.length >= 1) {
          if ("*" in frame.node.edges) {
            var substitutionNode = frame.node.edges["*"];
          } else {
            var substitutionNode = new lunr.TokenSet();
            frame.node.edges["*"] = substitutionNode;
          }

          if (frame.str.length == 1) {
            substitutionNode.final = true;
          } else {
            stack.push({
              node: substitutionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str.slice(1)
            });
          }
        }

        // insertion
        // can only do insertion if there are edits remaining
        if (frame.editsRemaining > 0) {
          if ("*" in frame.node.edges) {
            var insertionNode = frame.node.edges["*"];
          } else {
            var insertionNode = new lunr.TokenSet();
            frame.node.edges["*"] = insertionNode;
          }

          if (frame.str.length == 0) {
            insertionNode.final = true;
          } else {
            stack.push({
              node: insertionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str
            });
          }
        }

        // transposition
        // can only do a transposition if there are edits remaining
        // and there are enough characters to transpose
        if (frame.editsRemaining > 0 && frame.str.length > 1) {
          var charA = frame.str.charAt(0),
              charB = frame.str.charAt(1),
              transposeNode;

          if (charB in frame.node.edges) {
            transposeNode = frame.node.edges[charB];
          } else {
            transposeNode = new lunr.TokenSet();
            frame.node.edges[charB] = transposeNode;
          }

          if (frame.str.length == 1) {
            transposeNode.final = true;
          } else {
            stack.push({
              node: transposeNode,
              editsRemaining: frame.editsRemaining - 1,
              str: charA + frame.str.slice(2)
            });
          }
        }
      }

      return root;
    };

    /**
     * Creates a TokenSet from a string.
     *
     * The string may contain one or more wildcard characters (*)
     * that will allow wildcard matching when intersecting with
     * another TokenSet.
     *
     * @param {string} str - The string to create a TokenSet from.
     * @returns {lunr.TokenSet}
     */
    lunr.TokenSet.fromString = function (str) {
      var node = new lunr.TokenSet(),
          root = node,
          wildcardFound = false;

      /*
      * Iterates through all characters within the passed string
      * appending a node for each character.
      *
      * As soon as a wildcard character is found then a self
      * referencing edge is introduced to continually match
      * any number of any characters.
      */
      for (var i = 0, len = str.length; i < len; i++) {
        var char = str[i],
            final = i == len - 1;

        if (char == "*") {
          wildcardFound = true;
          node.edges[char] = node;
          node.final = final;
        } else {
          var next = new lunr.TokenSet();
          next.final = final;

          node.edges[char] = next;
          node = next;

          // TODO: is this needed anymore?
          if (wildcardFound) {
            node.edges["*"] = root;
          }
        }
      }

      return root;
    };

    /**
     * Converts this TokenSet into an array of strings
     * contained within the TokenSet.
     *
     * @returns {string[]}
     */
    lunr.TokenSet.prototype.toArray = function () {
      var words = [];

      var stack = [{
        prefix: "",
        node: this
      }];

      while (stack.length) {
        var frame = stack.pop(),
            edges = Object.keys(frame.node.edges),
            len = edges.length;

        if (frame.node.final) {
          words.push(frame.prefix);
        }

        for (var i = 0; i < len; i++) {
          var edge = edges[i];

          stack.push({
            prefix: frame.prefix.concat(edge),
            node: frame.node.edges[edge]
          });
        }
      }

      return words;
    };

    /**
     * Generates a string representation of a TokenSet.
     *
     * This is intended to allow TokenSets to be used as keys
     * in objects, largely to aid the construction and minimisation
     * of a TokenSet. As such it is not designed to be a human
     * friendly representation of the TokenSet.
     *
     * @returns {string}
     */
    lunr.TokenSet.prototype.toString = function () {
      // NOTE: Using Object.keys here as this.edges is very likely
      // to enter 'hash-mode' with many keys being added
      //
      // avoiding a for-in loop here as it leads to the function
      // being de-optimised (at least in V8). From some simple
      // benchmarks the performance is comparable, but allowing
      // V8 to optimize may mean easy performance wins in the future.

      if (this._str) {
        return this._str;
      }

      var str = this.final ? "1" : "0",
          labels = Object.keys(this.edges).sort(),
          len = labels.length;

      for (var i = 0; i < len; i++) {
        var label = labels[i],
            node = this.edges[label];

        str = str + label + node.id;
      }

      return str;
    };

    /**
     * Returns a new TokenSet that is the intersection of
     * this TokenSet and the passed TokenSet.
     *
     * This intersection will take into account any wildcards
     * contained within the TokenSet.
     *
     * @param {lunr.TokenSet} b - An other TokenSet to intersect with.
     * @returns {lunr.TokenSet}
     */
    lunr.TokenSet.prototype.intersect = function (b) {
      var output = new lunr.TokenSet(),
          frame = undefined;

      var stack = [{
        qNode: b,
        output: output,
        node: this
      }];

      while (stack.length) {
        frame = stack.pop();

        // NOTE: As with the #toString method, we are using
        // Object.keys and a for loop instead of a for-in loop
        // as both of these objects enter 'hash' mode, causing
        // the function to be de-optimised in V8
        var qEdges = Object.keys(frame.qNode.edges),
            qLen = qEdges.length,
            nEdges = Object.keys(frame.node.edges),
            nLen = nEdges.length;

        for (var q = 0; q < qLen; q++) {
          var qEdge = qEdges[q];

          for (var n = 0; n < nLen; n++) {
            var nEdge = nEdges[n];

            if (nEdge == qEdge || qEdge == "*") {
              var node = frame.node.edges[nEdge],
                  qNode = frame.qNode.edges[qEdge],
                  final = node.final && qNode.final,
                  next = undefined;

              if (nEdge in frame.output.edges) {
                // an edge already exists for this character
                // no need to create a new node, just set the finality
                // bit unless this node is already final
                next = frame.output.edges[nEdge];
                next.final = next.final || final;
              } else {
                // no edge exists yet, must create one
                // set the finality bit and insert it
                // into the output
                next = new lunr.TokenSet();
                next.final = final;
                frame.output.edges[nEdge] = next;
              }

              stack.push({
                qNode: qNode,
                output: next,
                node: node
              });
            }
          }
        }
      }

      return output;
    };
    lunr.TokenSet.Builder = function () {
      this.previousWord = "";
      this.root = new lunr.TokenSet();
      this.uncheckedNodes = [];
      this.minimizedNodes = {};
    };

    lunr.TokenSet.Builder.prototype.insert = function (word) {
      var node,
          commonPrefix = 0;

      if (word < this.previousWord) {
        throw new Error("Out of order word insertion");
      }

      for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
        if (word[i] != this.previousWord[i]) break;
        commonPrefix++;
      }

      this.minimize(commonPrefix);

      if (this.uncheckedNodes.length == 0) {
        node = this.root;
      } else {
        node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
      }

      for (var i = commonPrefix; i < word.length; i++) {
        var nextNode = new lunr.TokenSet(),
            char = word[i];

        node.edges[char] = nextNode;

        this.uncheckedNodes.push({
          parent: node,
          char: char,
          child: nextNode
        });

        node = nextNode;
      }

      node.final = true;
      this.previousWord = word;
    };

    lunr.TokenSet.Builder.prototype.finish = function () {
      this.minimize(0);
    };

    lunr.TokenSet.Builder.prototype.minimize = function (downTo) {
      for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
        var node = this.uncheckedNodes[i],
            childKey = node.child.toString();

        if (childKey in this.minimizedNodes) {
          node.parent.edges[node.char] = this.minimizedNodes[childKey];
        } else {
          // Cache the key for this node since
          // we know it can't change anymore
          node.child._str = childKey;

          this.minimizedNodes[childKey] = node.child;
        }

        this.uncheckedNodes.pop();
      }
    };
    /*!
    * lunr.Index
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * An index contains the built index of all documents and provides a query interface
     * to the index.
     *
     * Usually instances of lunr.Index will not be created using this constructor, instead
     * lunr.Builder should be used to construct new indexes, or lunr.Index.load should be
     * used to load previously built and serialized indexes.
     *
     * @constructor
     * @param {Object} attrs - The attributes of the built search index.
     * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
     * @param {Object<string, lunr.Vector>} attrs.documentVectors - Document vectors keyed by document reference.
     * @param {lunr.TokenSet} attrs.tokenSet - An set of all corpus tokens.
     * @param {string[]} attrs.fields - The names of indexed document fields.
     * @param {lunr.Pipeline} attrs.pipeline - The pipeline to use for search terms.
     */
    lunr.Index = function (attrs) {
      this.invertedIndex = attrs.invertedIndex;
      this.fieldVectors = attrs.fieldVectors;
      this.tokenSet = attrs.tokenSet;
      this.fields = attrs.fields;
      this.pipeline = attrs.pipeline;
    };

    /**
     * A result contains details of a document matching a search query.
     * @typedef {Object} lunr.Index~Result
     * @property {string} ref - The reference of the document this result represents.
     * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
     * @property {lunr.MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
     */

    /**
     * Although lunr provides the ability to create queries using lunr.Query, it also provides a simple
     * query language which itself is parsed into an instance of lunr.Query.
     *
     * For programmatically building queries it is advised to directly use lunr.Query, the query language
     * is best used for human entered text rather than program generated text.
     *
     * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
     * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
     * or 'world', though those that contain both will rank higher in the results.
     *
     * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
     * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
     * wildcards will increase the number of documents that will be found but can also have a negative
     * impact on query performance, especially with wildcards at the beginning of a term.
     *
     * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
     * hello in the title field will match this query. Using a field not present in the index will lead
     * to an error being thrown.
     *
     * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
     * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
     * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
     * Avoid large values for edit distance to improve query performance.
     *
     * To escape special characters the backslash character '\' can be used, this allows searches to include
     * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
     * of attempting to apply a boost of 2 to the search term "foo".
     *
     * @typedef {string} lunr.Index~QueryString
     * @example <caption>Simple single term query</caption>
     * hello
     * @example <caption>Multiple term query</caption>
     * hello world
     * @example <caption>term scoped to a field</caption>
     * title:hello
     * @example <caption>term with a boost of 10</caption>
     * hello^10
     * @example <caption>term with an edit distance of 2</caption>
     * hello~2
     */

    /**
     * Performs a search against the index using lunr query syntax.
     *
     * Results will be returned sorted by their score, the most relevant results
     * will be returned first.
     *
     * For more programmatic querying use lunr.Index#query.
     *
     * @param {lunr.Index~QueryString} queryString - A string containing a lunr query.
     * @throws {lunr.QueryParseError} If the passed query string cannot be parsed.
     * @returns {lunr.Index~Result[]}
     */
    lunr.Index.prototype.search = function (queryString) {
      return this.query(function (query) {
        var parser = new lunr.QueryParser(queryString, query);
        parser.parse();
      });
    };

    /**
     * A query builder callback provides a query object to be used to express
     * the query to perform on the index.
     *
     * @callback lunr.Index~queryBuilder
     * @param {lunr.Query} query - The query object to build up.
     * @this lunr.Query
     */

    /**
     * Performs a query against the index using the yielded lunr.Query object.
     *
     * If performing programmatic queries against the index, this method is preferred
     * over lunr.Index#search so as to avoid the additional query parsing overhead.
     *
     * A query object is yielded to the supplied function which should be used to
     * express the query to be run against the index.
     *
     * Note that although this function takes a callback parameter it is _not_ an
     * asynchronous operation, the callback is just yielded a query object to be
     * customized.
     *
     * @param {lunr.Index~queryBuilder} fn - A function that is used to build the query.
     * @returns {lunr.Index~Result[]}
     */
    lunr.Index.prototype.query = function (fn) {
      // for each query clause
      // * process terms
      // * expand terms from token set
      // * find matching documents and metadata
      // * get document vectors
      // * score documents

      var query = new lunr.Query(this.fields),
          matchingFields = Object.create(null),
          queryVectors = Object.create(null),
          termFieldCache = Object.create(null);

      fn.call(query, query);

      for (var i = 0; i < query.clauses.length; i++) {
        /*
        * Unless the pipeline has been disabled for this term, which is
        * the case for terms with wildcards, we need to pass the clause
        * term through the search pipeline. A pipeline returns an array
        * of processed terms. Pipeline functions may expand the passed
        * term, which means we may end up performing multiple index lookups
        * for a single query term.
        */
        var clause = query.clauses[i],
            terms = null;

        if (clause.usePipeline) {
          terms = this.pipeline.runString(clause.term);
        } else {
          terms = [clause.term];
        }

        for (var m = 0; m < terms.length; m++) {
          var term = terms[m];

          /*
          * Each term returned from the pipeline needs to use the same query
          * clause object, e.g. the same boost and or edit distance. The
          * simplest way to do this is to re-use the clause object but mutate
          * its term property.
          */
          clause.term = term;

          /*
          * From the term in the clause we create a token set which will then
          * be used to intersect the indexes token set to get a list of terms
          * to lookup in the inverted index
          */
          var termTokenSet = lunr.TokenSet.fromClause(clause),
              expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();

          for (var j = 0; j < expandedTerms.length; j++) {
            /*
            * For each term get the posting and termIndex, this is required for
            * building the query vector.
            */
            var expandedTerm = expandedTerms[j],
                posting = this.invertedIndex[expandedTerm],
                termIndex = posting._index;

            for (var k = 0; k < clause.fields.length; k++) {
              /*
              * For each field that this query term is scoped by (by default
              * all fields are in scope) we need to get all the document refs
              * that have this term in that field.
              *
              * The posting is the entry in the invertedIndex for the matching
              * term from above.
              */
              var field = clause.fields[k],
                  fieldPosting = posting[field],
                  matchingDocumentRefs = Object.keys(fieldPosting),
                  termField = expandedTerm + "/" + field;

              /*
              * To support field level boosts a query vector is created per
              * field. This vector is populated using the termIndex found for
              * the term and a unit value with the appropriate boost applied.
              *
              * If the query vector for this field does not exist yet it needs
              * to be created.
              */
              if (queryVectors[field] === undefined) {
                queryVectors[field] = new lunr.Vector();
              }

              /*
              * Using upsert because there could already be an entry in the vector
              * for the term we are working with. In that case we just add the scores
              * together.
              */
              queryVectors[field].upsert(termIndex, 1 * clause.boost, function (a, b) {
                return a + b;
              });

              /**
               * If we've already seen this term, field combo then we've already collected
               * the matching documents and metadata, no need to go through all that again
               */
              if (termFieldCache[termField]) {
                continue;
              }

              for (var l = 0; l < matchingDocumentRefs.length; l++) {
                /*
                * All metadata for this term/field/document triple
                * are then extracted and collected into an instance
                * of lunr.MatchData ready to be returned in the query
                * results
                */
                var matchingDocumentRef = matchingDocumentRefs[l],
                    matchingFieldRef = new lunr.FieldRef(matchingDocumentRef, field),
                    metadata = fieldPosting[matchingDocumentRef],
                    fieldMatch;

                if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) {
                  matchingFields[matchingFieldRef] = new lunr.MatchData(expandedTerm, field, metadata);
                } else {
                  fieldMatch.add(expandedTerm, field, metadata);
                }
              }

              termFieldCache[termField] = true;
            }
          }
        }
      }

      var matchingFieldRefs = Object.keys(matchingFields),
          results = [],
          matches = Object.create(null);

      for (var i = 0; i < matchingFieldRefs.length; i++) {
        /*
        * Currently we have document fields that match the query, but we
        * need to return documents. The matchData and scores are combined
        * from multiple fields belonging to the same document.
        *
        * Scores are calculated by field, using the query vectors created
        * above, and combined into a final document score using addition.
        */
        var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]),
            docRef = fieldRef.docRef,
            fieldVector = this.fieldVectors[fieldRef],
            score = queryVectors[fieldRef.fieldName].similarity(fieldVector),
            docMatch;

        if ((docMatch = matches[docRef]) !== undefined) {
          docMatch.score += score;
          docMatch.matchData.combine(matchingFields[fieldRef]);
        } else {
          var match = {
            ref: docRef,
            score: score,
            matchData: matchingFields[fieldRef]
          };
          matches[docRef] = match;
          results.push(match);
        }
      }

      /*
      * Sort the results objects by score, highest first.
      */
      return results.sort(function (a, b) {
        return b.score - a.score;
      });
    };

    /**
     * Prepares the index for JSON serialization.
     *
     * The schema for this JSON blob will be described in a
     * separate JSON schema file.
     *
     * @returns {Object}
     */
    lunr.Index.prototype.toJSON = function () {
      var invertedIndex = Object.keys(this.invertedIndex).sort().map(function (term) {
        return [term, this.invertedIndex[term]];
      }, this);

      var fieldVectors = Object.keys(this.fieldVectors).map(function (ref) {
        return [ref, this.fieldVectors[ref].toJSON()];
      }, this);

      return {
        version: lunr.version,
        fields: this.fields,
        fieldVectors: fieldVectors,
        invertedIndex: invertedIndex,
        pipeline: this.pipeline.toJSON()
      };
    };

    /**
     * Loads a previously serialized lunr.Index
     *
     * @param {Object} serializedIndex - A previously serialized lunr.Index
     * @returns {lunr.Index}
     */
    lunr.Index.load = function (serializedIndex) {
      var attrs = {},
          fieldVectors = {},
          serializedVectors = serializedIndex.fieldVectors,
          invertedIndex = {},
          serializedInvertedIndex = serializedIndex.invertedIndex,
          tokenSetBuilder = new lunr.TokenSet.Builder(),
          pipeline = lunr.Pipeline.load(serializedIndex.pipeline);

      if (serializedIndex.version != lunr.version) {
        lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'");
      }

      for (var i = 0; i < serializedVectors.length; i++) {
        var tuple = serializedVectors[i],
            ref = tuple[0],
            elements = tuple[1];

        fieldVectors[ref] = new lunr.Vector(elements);
      }

      for (var i = 0; i < serializedInvertedIndex.length; i++) {
        var tuple = serializedInvertedIndex[i],
            term = tuple[0],
            posting = tuple[1];

        tokenSetBuilder.insert(term);
        invertedIndex[term] = posting;
      }

      tokenSetBuilder.finish();

      attrs.fields = serializedIndex.fields;

      attrs.fieldVectors = fieldVectors;
      attrs.invertedIndex = invertedIndex;
      attrs.tokenSet = tokenSetBuilder.root;
      attrs.pipeline = pipeline;

      return new lunr.Index(attrs);
    };
    /*!
    * lunr.Builder
    * Copyright (C) 2017 Oliver Nightingale
    */

    /**
     * lunr.Builder performs indexing on a set of documents and
     * returns instances of lunr.Index ready for querying.
     *
     * All configuration of the index is done via the builder, the
     * fields to index, the document reference, the text processing
     * pipeline and document scoring parameters are all set on the
     * builder before indexing.
     *
     * @constructor
     * @property {string} _ref - Internal reference to the document reference field.
     * @property {string[]} _fields - Internal reference to the document fields to index.
     * @property {object} invertedIndex - The inverted index maps terms to document fields.
     * @property {object} documentTermFrequencies - Keeps track of document term frequencies.
     * @property {object} documentLengths - Keeps track of the length of documents added to the index.
     * @property {lunr.tokenizer} tokenizer - Function for splitting strings into tokens for indexing.
     * @property {lunr.Pipeline} pipeline - The pipeline performs text processing on tokens before indexing.
     * @property {lunr.Pipeline} searchPipeline - A pipeline for processing search terms before querying the index.
     * @property {number} documentCount - Keeps track of the total number of documents indexed.
     * @property {number} _b - A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
     * @property {number} _k1 - A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
     * @property {number} termIndex - A counter incremented for each unique term, used to identify a terms position in the vector space.
     * @property {array} metadataWhitelist - A list of metadata keys that have been whitelisted for entry in the index.
     */
    lunr.Builder = function () {
      this._ref = "id";
      this._fields = [];
      this.invertedIndex = Object.create(null);
      this.fieldTermFrequencies = {};
      this.fieldLengths = {};
      this.tokenizer = lunr.tokenizer;
      this.pipeline = new lunr.Pipeline();
      this.searchPipeline = new lunr.Pipeline();
      this.documentCount = 0;
      this._b = 0.75;
      this._k1 = 1.2;
      this.termIndex = 0;
      this.metadataWhitelist = [];
    };

    /**
     * Sets the document field used as the document reference. Every document must have this field.
     * The type of this field in the document should be a string, if it is not a string it will be
     * coerced into a string by calling toString.
     *
     * The default ref is 'id'.
     *
     * The ref should _not_ be changed during indexing, it should be set before any documents are
     * added to the index. Changing it during indexing can lead to inconsistent results.
     *
     * @param {string} ref - The name of the reference field in the document.
     */
    lunr.Builder.prototype.ref = function (ref) {
      this._ref = ref;
    };

    /**
     * Adds a field to the list of document fields that will be indexed. Every document being
     * indexed should have this field. Null values for this field in indexed documents will
     * not cause errors but will limit the chance of that document being retrieved by searches.
     *
     * All fields should be added before adding documents to the index. Adding fields after
     * a document has been indexed will have no effect on already indexed documents.
     *
     * @param {string} field - The name of a field to index in all documents.
     */
    lunr.Builder.prototype.field = function (field) {
      this._fields.push(field);
    };

    /**
     * A parameter to tune the amount of field length normalisation that is applied when
     * calculating relevance scores. A value of 0 will completely disable any normalisation
     * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
     * will be clamped to the range 0 - 1.
     *
     * @param {number} number - The value to set for this tuning parameter.
     */
    lunr.Builder.prototype.b = function (number) {
      if (number < 0) {
        this._b = 0;
      } else if (number > 1) {
        this._b = 1;
      } else {
        this._b = number;
      }
    };

    /**
     * A parameter that controls the speed at which a rise in term frequency results in term
     * frequency saturation. The default value is 1.2. Setting this to a higher value will give
     * slower saturation levels, a lower value will result in quicker saturation.
     *
     * @param {number} number - The value to set for this tuning parameter.
     */
    lunr.Builder.prototype.k1 = function (number) {
      this._k1 = number;
    };

    /**
     * Adds a document to the index.
     *
     * Before adding fields to the index the index should have been fully setup, with the document
     * ref and all fields to index already having been specified.
     *
     * The document must have a field name as specified by the ref (by default this is 'id') and
     * it should have all fields defined for indexing, though null or undefined values will not
     * cause errors.
     *
     * @param {object} doc - The document to add to the index.
     */
    lunr.Builder.prototype.add = function (doc) {
      var docRef = doc[this._ref];

      this.documentCount += 1;

      for (var i = 0; i < this._fields.length; i++) {
        var fieldName = this._fields[i],
            field = doc[fieldName],
            tokens = this.tokenizer(field),
            terms = this.pipeline.run(tokens),
            fieldRef = new lunr.FieldRef(docRef, fieldName),
            fieldTerms = Object.create(null);

        this.fieldTermFrequencies[fieldRef] = fieldTerms;
        this.fieldLengths[fieldRef] = 0;

        // store the length of this field for this document
        this.fieldLengths[fieldRef] += terms.length;

        // calculate term frequencies for this field
        for (var j = 0; j < terms.length; j++) {
          var term = terms[j];

          if (fieldTerms[term] == undefined) {
            fieldTerms[term] = 0;
          }

          fieldTerms[term] += 1;

          // add to inverted index
          // create an initial posting if one doesn't exist
          if (this.invertedIndex[term] == undefined) {
            var posting = Object.create(null);
            posting["_index"] = this.termIndex;
            this.termIndex += 1;

            for (var k = 0; k < this._fields.length; k++) {
              posting[this._fields[k]] = Object.create(null);
            }

            this.invertedIndex[term] = posting;
          }

          // add an entry for this term/fieldName/docRef to the invertedIndex
          if (this.invertedIndex[term][fieldName][docRef] == undefined) {
            this.invertedIndex[term][fieldName][docRef] = Object.create(null);
          }

          // store all whitelisted metadata about this token in the
          // inverted index
          for (var l = 0; l < this.metadataWhitelist.length; l++) {
            var metadataKey = this.metadataWhitelist[l],
                metadata = term.metadata[metadataKey];

            if (this.invertedIndex[term][fieldName][docRef][metadataKey] == undefined) {
              this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
            }

            this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
          }
        }
      }
    };

    /**
     * Calculates the average document length for this index
     *
     * @private
     */
    lunr.Builder.prototype.calculateAverageFieldLengths = function () {
      var fieldRefs = Object.keys(this.fieldLengths),
          numberOfFields = fieldRefs.length,
          accumulator = {},
          documentsWithField = {};

      for (var i = 0; i < numberOfFields; i++) {
        var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
            field = fieldRef.fieldName;

        documentsWithField[field] || (documentsWithField[field] = 0);
        documentsWithField[field] += 1;

        accumulator[field] || (accumulator[field] = 0);
        accumulator[field] += this.fieldLengths[fieldRef];
      }

      for (var i = 0; i < this._fields.length; i++) {
        var field = this._fields[i];
        accumulator[field] = accumulator[field] / documentsWithField[field];
      }

      this.averageFieldLength = accumulator;
    };

    /**
     * Builds a vector space model of every document using lunr.Vector
     *
     * @private
     */
    lunr.Builder.prototype.createFieldVectors = function () {
      var fieldVectors = {},
          fieldRefs = Object.keys(this.fieldTermFrequencies),
          fieldRefsLength = fieldRefs.length,
          termIdfCache = Object.create(null);

      for (var i = 0; i < fieldRefsLength; i++) {
        var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
            field = fieldRef.fieldName,
            fieldLength = this.fieldLengths[fieldRef],
            fieldVector = new lunr.Vector(),
            termFrequencies = this.fieldTermFrequencies[fieldRef],
            terms = Object.keys(termFrequencies),
            termsLength = terms.length;

        for (var j = 0; j < termsLength; j++) {
          var term = terms[j],
              tf = termFrequencies[term],
              termIndex = this.invertedIndex[term]._index,
              idf,
              score,
              scoreWithPrecision;

          if (termIdfCache[term] === undefined) {
            idf = lunr.idf(this.invertedIndex[term], this.documentCount);
            termIdfCache[term] = idf;
          } else {
            idf = termIdfCache[term];
          }

          score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[field])) + tf);
          scoreWithPrecision = Math.round(score * 1000) / 1000;
          // Converts 1.23456789 to 1.234.
          // Reducing the precision so that the vectors take up less
          // space when serialised. Doing it now so that they behave
          // the same before and after serialisation. Also, this is
          // the fastest approach to reducing a number's precision in
          // JavaScript.

          fieldVector.insert(termIndex, scoreWithPrecision);
        }

        fieldVectors[fieldRef] = fieldVector;
      }

      this.fieldVectors = fieldVectors;
    };

    /**
     * Creates a token set of all tokens in the index using lunr.TokenSet
     *
     * @private
     */
    lunr.Builder.prototype.createTokenSet = function () {
      this.tokenSet = lunr.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
    };

    /**
     * Builds the index, creating an instance of lunr.Index.
     *
     * This completes the indexing process and should only be called
     * once all documents have been added to the index.
     *
     * @returns {lunr.Index}
     */
    lunr.Builder.prototype.build = function () {
      this.calculateAverageFieldLengths();
      this.createFieldVectors();
      this.createTokenSet();

      return new lunr.Index({
        invertedIndex: this.invertedIndex,
        fieldVectors: this.fieldVectors,
        tokenSet: this.tokenSet,
        fields: this._fields,
        pipeline: this.searchPipeline
      });
    };

    /**
     * Applies a plugin to the index builder.
     *
     * A plugin is a function that is called with the index builder as its context.
     * Plugins can be used to customise or extend the behaviour of the index
     * in some way. A plugin is just a function, that encapsulated the custom
     * behaviour that should be applied when building the index.
     *
     * The plugin function will be called with the index builder as its argument, additional
     * arguments can also be passed when calling use. The function will be called
     * with the index builder as its context.
     *
     * @param {Function} plugin The plugin to apply.
     */
    lunr.Builder.prototype.use = function (fn) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(this);
      fn.apply(this, args);
    };
    /**
     * Contains and collects metadata about a matching document.
     * A single instance of lunr.MatchData is returned as part of every
     * lunr.Index~Result.
     *
     * @constructor
     * @param {string} term - The term this match data is associated with
     * @param {string} field - The field in which the term was found
     * @param {object} metadata - The metadata recorded about this term in this field
     * @property {object} metadata - A cloned collection of metadata associated with this document.
     * @see {@link lunr.Index~Result}
     */
    lunr.MatchData = function (term, field, metadata) {
      var clonedMetadata = Object.create(null),
          metadataKeys = Object.keys(metadata);

      // Cloning the metadata to prevent the original
      // being mutated during match data combination.
      // Metadata is kept in an array within the inverted
      // index so cloning the data can be done with
      // Array#slice
      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];
        clonedMetadata[key] = metadata[key].slice();
      }

      this.metadata = Object.create(null);
      this.metadata[term] = Object.create(null);
      this.metadata[term][field] = clonedMetadata;
    };

    /**
     * An instance of lunr.MatchData will be created for every term that matches a
     * document. However only one instance is required in a lunr.Index~Result. This
     * method combines metadata from another instance of lunr.MatchData with this
     * objects metadata.
     *
     * @param {lunr.MatchData} otherMatchData - Another instance of match data to merge with this one.
     * @see {@link lunr.Index~Result}
     */
    lunr.MatchData.prototype.combine = function (otherMatchData) {
      var terms = Object.keys(otherMatchData.metadata);

      for (var i = 0; i < terms.length; i++) {
        var term = terms[i],
            fields = Object.keys(otherMatchData.metadata[term]);

        if (this.metadata[term] == undefined) {
          this.metadata[term] = Object.create(null);
        }

        for (var j = 0; j < fields.length; j++) {
          var field = fields[j],
              keys = Object.keys(otherMatchData.metadata[term][field]);

          if (this.metadata[term][field] == undefined) {
            this.metadata[term][field] = Object.create(null);
          }

          for (var k = 0; k < keys.length; k++) {
            var key = keys[k];

            if (this.metadata[term][field][key] == undefined) {
              this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
            } else {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
            }
          }
        }
      }
    };

    /**
     * Add metadata for a term/field pair to this instance of match data.
     *
     * @param {string} term - The term this match data is associated with
     * @param {string} field - The field in which the term was found
     * @param {object} metadata - The metadata recorded about this term in this field
     */
    lunr.MatchData.prototype.add = function (term, field, metadata) {
      if (!(term in this.metadata)) {
        this.metadata[term] = Object.create(null);
        this.metadata[term][field] = metadata;
        return;
      }

      if (!(field in this.metadata[term])) {
        this.metadata[term][field] = metadata;
        return;
      }

      var metadataKeys = Object.keys(metadata);

      for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i];

        if (key in this.metadata[term][field]) {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
        } else {
          this.metadata[term][field][key] = metadata[key];
        }
      }
    };
    /**
     * A lunr.Query provides a programmatic way of defining queries to be performed
     * against a {@link lunr.Index}.
     *
     * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
     * so the query object is pre-initialized with the right index fields.
     *
     * @constructor
     * @property {lunr.Query~Clause[]} clauses - An array of query clauses.
     * @property {string[]} allFields - An array of all available fields in a lunr.Index.
     */
    lunr.Query = function (allFields) {
      this.clauses = [];
      this.allFields = allFields;
    };

    /**
     * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
     *
     * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
     * concatenation.
     *
     * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
     *
     * @constant
     * @default
     * @property {number} wildcard.NONE - The term will have no wildcards inserted, this is the default behaviour
     * @property {number} wildcard.LEADING - Prepend the term with a wildcard, unless a leading wildcard already exists
     * @property {number} wildcard.TRAILING - Append a wildcard to the term, unless a trailing wildcard already exists
     * @see lunr.Query~Clause
     * @see lunr.Query#clause
     * @see lunr.Query#term
     * @example <caption>query term with trailing wildcard</caption>
     * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
     * @example <caption>query term with leading and trailing wildcard</caption>
     * query.term('foo', {
     *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
     * })
     */
    lunr.Query.wildcard = new String("*");
    lunr.Query.wildcard.NONE = 0;
    lunr.Query.wildcard.LEADING = 1;
    lunr.Query.wildcard.TRAILING = 2;

    /**
     * A single clause in a {@link lunr.Query} contains a term and details on how to
     * match that term against a {@link lunr.Index}.
     *
     * @typedef {Object} lunr.Query~Clause
     * @property {string[]} fields - The fields in an index this clause should be matched against.
     * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
     * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
     * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
     * @property {number} [wildcard=0] - Whether the term should have wildcards appended or prepended.
     */

    /**
     * Adds a {@link lunr.Query~Clause} to this query.
     *
     * Unless the clause contains the fields to be matched all fields will be matched. In addition
     * a default boost of 1 is applied to the clause.
     *
     * @param {lunr.Query~Clause} clause - The clause to add to this query.
     * @see lunr.Query~Clause
     * @returns {lunr.Query}
     */
    lunr.Query.prototype.clause = function (clause) {
      if (!("fields" in clause)) {
        clause.fields = this.allFields;
      }

      if (!("boost" in clause)) {
        clause.boost = 1;
      }

      if (!("usePipeline" in clause)) {
        clause.usePipeline = true;
      }

      if (!("wildcard" in clause)) {
        clause.wildcard = lunr.Query.wildcard.NONE;
      }

      if (clause.wildcard & lunr.Query.wildcard.LEADING && clause.term.charAt(0) != lunr.Query.wildcard) {
        clause.term = "*" + clause.term;
      }

      if (clause.wildcard & lunr.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr.Query.wildcard) {
        clause.term = "" + clause.term + "*";
      }

      this.clauses.push(clause);

      return this;
    };

    /**
     * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
     * to the list of clauses that make up this query.
     *
     * @param {string} term - The term to add to the query.
     * @param {Object} [options] - Any additional properties to add to the query clause.
     * @returns {lunr.Query}
     * @see lunr.Query#clause
     * @see lunr.Query~Clause
     * @example <caption>adding a single term to a query</caption>
     * query.term("foo")
     * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
     * query.term("foo", {
     *   fields: ["title"],
     *   boost: 10,
     *   wildcard: lunr.Query.wildcard.TRAILING
     * })
     */
    lunr.Query.prototype.term = function (term, options) {
      var clause = options || {};
      clause.term = term;

      this.clause(clause);

      return this;
    };
    lunr.QueryParseError = function (message, start, end) {
      this.name = "QueryParseError";
      this.message = message;
      this.start = start;
      this.end = end;
    };

    lunr.QueryParseError.prototype = new Error();
    lunr.QueryLexer = function (str) {
      this.lexemes = [];
      this.str = str;
      this.length = str.length;
      this.pos = 0;
      this.start = 0;
      this.escapeCharPositions = [];
    };

    lunr.QueryLexer.prototype.run = function () {
      var state = lunr.QueryLexer.lexText;

      while (state) {
        state = state(this);
      }
    };

    lunr.QueryLexer.prototype.sliceString = function () {
      var subSlices = [],
          sliceStart = this.start,
          sliceEnd = this.pos;

      for (var i = 0; i < this.escapeCharPositions.length; i++) {
        sliceEnd = this.escapeCharPositions[i];
        subSlices.push(this.str.slice(sliceStart, sliceEnd));
        sliceStart = sliceEnd + 1;
      }

      subSlices.push(this.str.slice(sliceStart, this.pos));
      this.escapeCharPositions.length = 0;

      return subSlices.join("");
    };

    lunr.QueryLexer.prototype.emit = function (type) {
      this.lexemes.push({
        type: type,
        str: this.sliceString(),
        start: this.start,
        end: this.pos
      });

      this.start = this.pos;
    };

    lunr.QueryLexer.prototype.escapeCharacter = function () {
      this.escapeCharPositions.push(this.pos - 1);
      this.pos += 1;
    };

    lunr.QueryLexer.prototype.next = function () {
      if (this.pos >= this.length) {
        return lunr.QueryLexer.EOS;
      }

      var char = this.str.charAt(this.pos);
      this.pos += 1;
      return char;
    };

    lunr.QueryLexer.prototype.width = function () {
      return this.pos - this.start;
    };

    lunr.QueryLexer.prototype.ignore = function () {
      if (this.start == this.pos) {
        this.pos += 1;
      }

      this.start = this.pos;
    };

    lunr.QueryLexer.prototype.backup = function () {
      this.pos -= 1;
    };

    lunr.QueryLexer.prototype.acceptDigitRun = function () {
      var char, charCode;

      do {
        char = this.next();
        charCode = char.charCodeAt(0);
      } while (charCode > 47 && charCode < 58);

      if (char != lunr.QueryLexer.EOS) {
        this.backup();
      }
    };

    lunr.QueryLexer.prototype.more = function () {
      return this.pos < this.length;
    };

    lunr.QueryLexer.EOS = "EOS";
    lunr.QueryLexer.FIELD = "FIELD";
    lunr.QueryLexer.TERM = "TERM";
    lunr.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
    lunr.QueryLexer.BOOST = "BOOST";

    lunr.QueryLexer.lexField = function (lexer) {
      lexer.backup();
      lexer.emit(lunr.QueryLexer.FIELD);
      lexer.ignore();
      return lunr.QueryLexer.lexText;
    };

    lunr.QueryLexer.lexTerm = function (lexer) {
      if (lexer.width() > 1) {
        lexer.backup();
        lexer.emit(lunr.QueryLexer.TERM);
      }

      lexer.ignore();

      if (lexer.more()) {
        return lunr.QueryLexer.lexText;
      }
    };

    lunr.QueryLexer.lexEditDistance = function (lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr.QueryLexer.EDIT_DISTANCE);
      return lunr.QueryLexer.lexText;
    };

    lunr.QueryLexer.lexBoost = function (lexer) {
      lexer.ignore();
      lexer.acceptDigitRun();
      lexer.emit(lunr.QueryLexer.BOOST);
      return lunr.QueryLexer.lexText;
    };

    lunr.QueryLexer.lexEOS = function (lexer) {
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM);
      }
    };

    // This matches the separator used when tokenising fields
    // within a document. These should match otherwise it is
    // not possible to search for some tokens within a document.
    //
    // It is possible for the user to change the separator on the
    // tokenizer so it _might_ clash with any other of the special
    // characters already used within the search string, e.g. :.
    //
    // This means that it is possible to change the separator in
    // such a way that makes some words unsearchable using a search
    // string.
    lunr.QueryLexer.termSeparator = lunr.tokenizer.separator;

    lunr.QueryLexer.lexText = function (lexer) {
      while (true) {
        var char = lexer.next();

        if (char == lunr.QueryLexer.EOS) {
          return lunr.QueryLexer.lexEOS;
        }

        // Escape character is '\'
        if (char.charCodeAt(0) == 92) {
          lexer.escapeCharacter();
          continue;
        }

        if (char == ":") {
          return lunr.QueryLexer.lexField;
        }

        if (char == "~") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr.QueryLexer.TERM);
          }
          return lunr.QueryLexer.lexEditDistance;
        }

        if (char == "^") {
          lexer.backup();
          if (lexer.width() > 0) {
            lexer.emit(lunr.QueryLexer.TERM);
          }
          return lunr.QueryLexer.lexBoost;
        }

        if (char.match(lunr.QueryLexer.termSeparator)) {
          return lunr.QueryLexer.lexTerm;
        }
      }
    };

    lunr.QueryParser = function (str, query) {
      this.lexer = new lunr.QueryLexer(str);
      this.query = query;
      this.currentClause = {};
      this.lexemeIdx = 0;
    };

    lunr.QueryParser.prototype.parse = function () {
      this.lexer.run();
      this.lexemes = this.lexer.lexemes;

      var state = lunr.QueryParser.parseFieldOrTerm;

      while (state) {
        state = state(this);
      }

      return this.query;
    };

    lunr.QueryParser.prototype.peekLexeme = function () {
      return this.lexemes[this.lexemeIdx];
    };

    lunr.QueryParser.prototype.consumeLexeme = function () {
      var lexeme = this.peekLexeme();
      this.lexemeIdx += 1;
      return lexeme;
    };

    lunr.QueryParser.prototype.nextClause = function () {
      var completedClause = this.currentClause;
      this.query.clause(completedClause);
      this.currentClause = {};
    };

    lunr.QueryParser.parseFieldOrTerm = function (parser) {
      var lexeme = parser.peekLexeme();

      if (lexeme == undefined) {
        return;
      }

      switch (lexeme.type) {
        case lunr.QueryLexer.FIELD:
          return lunr.QueryParser.parseField;
        case lunr.QueryLexer.TERM:
          return lunr.QueryParser.parseTerm;
        default:
          var errorMessage = "expected either a field or a term, found " + lexeme.type;

          if (lexeme.str.length >= 1) {
            errorMessage += " with value '" + lexeme.str + "'";
          }

          throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }
    };

    lunr.QueryParser.parseField = function (parser) {
      var lexeme = parser.consumeLexeme();

      if (lexeme == undefined) {
        return;
      }

      if (parser.query.allFields.indexOf(lexeme.str) == -1) {
        var possibleFields = parser.query.allFields.map(function (f) {
          return "'" + f + "'";
        }).join(", "),
            errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;

        throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }

      parser.currentClause.fields = [lexeme.str];

      var nextLexeme = parser.peekLexeme();

      if (nextLexeme == undefined) {
        var errorMessage = "expecting term, found nothing";
        throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }

      switch (nextLexeme.type) {
        case lunr.QueryLexer.TERM:
          return lunr.QueryParser.parseTerm;
        default:
          var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
          throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };

    lunr.QueryParser.parseTerm = function (parser) {
      var lexeme = parser.consumeLexeme();

      if (lexeme == undefined) {
        return;
      }

      parser.currentClause.term = lexeme.str.toLowerCase();

      if (lexeme.str.indexOf("*") != -1) {
        parser.currentClause.usePipeline = false;
      }

      var nextLexeme = parser.peekLexeme();

      if (nextLexeme == undefined) {
        parser.nextClause();
        return;
      }

      switch (nextLexeme.type) {
        case lunr.QueryLexer.TERM:
          parser.nextClause();
          return lunr.QueryParser.parseTerm;
        case lunr.QueryLexer.FIELD:
          parser.nextClause();
          return lunr.QueryParser.parseField;
        case lunr.QueryLexer.EDIT_DISTANCE:
          return lunr.QueryParser.parseEditDistance;
        case lunr.QueryLexer.BOOST:
          return lunr.QueryParser.parseBoost;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };

    lunr.QueryParser.parseEditDistance = function (parser) {
      var lexeme = parser.consumeLexeme();

      if (lexeme == undefined) {
        return;
      }

      var editDistance = parseInt(lexeme.str, 10);

      if (isNaN(editDistance)) {
        var errorMessage = "edit distance must be numeric";
        throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }

      parser.currentClause.editDistance = editDistance;

      var nextLexeme = parser.peekLexeme();

      if (nextLexeme == undefined) {
        parser.nextClause();
        return;
      }

      switch (nextLexeme.type) {
        case lunr.QueryLexer.TERM:
          parser.nextClause();
          return lunr.QueryParser.parseTerm;
        case lunr.QueryLexer.FIELD:
          parser.nextClause();
          return lunr.QueryParser.parseField;
        case lunr.QueryLexer.EDIT_DISTANCE:
          return lunr.QueryParser.parseEditDistance;
        case lunr.QueryLexer.BOOST:
          return lunr.QueryParser.parseBoost;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };

    lunr.QueryParser.parseBoost = function (parser) {
      var lexeme = parser.consumeLexeme();

      if (lexeme == undefined) {
        return;
      }

      var boost = parseInt(lexeme.str, 10);

      if (isNaN(boost)) {
        var errorMessage = "boost must be numeric";
        throw new lunr.QueryParseError(errorMessage, lexeme.start, lexeme.end);
      }

      parser.currentClause.boost = boost;

      var nextLexeme = parser.peekLexeme();

      if (nextLexeme == undefined) {
        parser.nextClause();
        return;
      }

      switch (nextLexeme.type) {
        case lunr.QueryLexer.TERM:
          parser.nextClause();
          return lunr.QueryParser.parseTerm;
        case lunr.QueryLexer.FIELD:
          parser.nextClause();
          return lunr.QueryParser.parseField;
        case lunr.QueryLexer.EDIT_DISTANCE:
          return lunr.QueryParser.parseEditDistance;
        case lunr.QueryLexer.BOOST:
          return lunr.QueryParser.parseBoost;
        default:
          var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
          throw new lunr.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
      }
    };

    return lunr;
  }();

  //This is the main plugin definition
  $.fn.ghostHunter = function (options) {
    //Here we use jQuery's extend to set default values if they weren't set by the user
    var opts = $.extend({}, $.fn.ghostHunter.defaults, options);
    if (opts.results) {
      pluginMethods.init(this, opts);
      return pluginMethods;
    }
  };

  // If the Ghost instance is in a subpath of the site, set subpath
  // as the path to the site with a leading slash and no trailing slash
  // (i.e. "/path/to/instance").
  $.fn.ghostHunter.defaults = {
    resultsData: false,
    onPageLoad: true,
    onKeyUp: false,
    result_template: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",
    info_template: "<p>Number of posts found: {{amount}}</p>",
    displaySearchInfo: true,
    zeroResultsInfo: true,
    before: false,
    onComplete: false,
    includepages: false,
    filterfields: false,
    subpath: "",
    item_preprocessor: false,
    indexing_start: false,
    indexing_end: false
  };
  var prettyDate = function (date) {
    var d = new Date(date);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
  };

  var getSubpathKey = function (str) {
    return str.replace(/^\//, "").replace(/\//g, "-");
  };

  var grabAndIndex = function () {
    if (this.indexing_start) {
      this.indexing_start();
    }
    this.blogData = {};
    this.latestPost = 0;
    var params = {
      limit: "all",
      include: "tags",
      formats: ["plaintext"]
    };
    if (this.includepages) {
      params.filter = "(page:true,page:false)";
    }
    var me = this;
    $.get(ghost.url.api("posts", params)).done(function (data) {
      var idxSrc = data.posts;
      console.log("ghostHunter: indexing all posts");
      me.index = lunr(function () {
        this.field("title", { boost: 10 });
        this.field("description");
        this.field("plaintext", { boost: 5 });
        this.field("pubDate");
        this.field("tag");
        this.ref("id");
        idxSrc.forEach(function (arrayItem) {
          // Track the latest value of updated_at,  to stash in localStorage
          var itemDate = new Date(arrayItem.updated_at).getTime();
          var recordedDate = new Date(me.latestPost).getTime();
          if (itemDate > recordedDate) {
            me.latestPost = arrayItem.updated_at;
          }
          var tag_arr = arrayItem.tags.map(function (v) {
            return v.name; // `tag` object has an `name` property which is the value of tag. If you also want other info, check API and get that property
          });
          if (arrayItem.meta_description == null) {
            arrayItem.meta_description = "";
          }
          var category = tag_arr.join(", ");
          if (category.length < 1) {
            category = "undefined";
          }
          var parsedData = {
            id: String(arrayItem.id),
            title: String(arrayItem.title),
            description: String(arrayItem.meta_description),
            plaintext: String(arrayItem.plaintext),
            pubDate: String(arrayItem.published_at),
            tag: category
          };
          this.add(parsedData);
          var localUrl = me.subpath + arrayItem.url;
          me.blogData[arrayItem.id] = {
            title: arrayItem.title,
            description: arrayItem.meta_description,
            pubDate: prettyDate(parsedData.pubDate),
            link: localUrl,
            tags: tag_arr
          };
          // If there is a metadata "pre"-processor for the item, run it here.
          if (me.item_preprocessor) {
            Object.assign(me.blogData[arrayItem.id], me.item_preprocessor(arrayItem));
          }
        }, this);
        if (me.indexing_end) {
          me.indexing_end();
        }
      });
      try {
        var subpathKey = getSubpathKey(me.subpath);
        localStorage.setItem("ghost_" + subpathKey + "_lunrIndex", JSON.stringify(me.index));
        localStorage.setItem("ghost_" + subpathKey + "_blogData", JSON.stringify(me.blogData));
        localStorage.setItem("ghost_" + subpathKey + "_latestPost", me.latestPost);
      } catch (e) {
        console.warn("ghostHunter: save to localStorage failed: " + e);
      }
      me.isInit = true;
    });
  };

  var pluginMethods = {
    isInit: false,

    init: function (target, opts) {
      var that = this;
      Object.assign(this, opts);

      if (opts.onPageLoad) {
        function miam() {
          that.loadAPI();
        }
        window.setTimeout(miam, 1);
      } else {
        target.focus(function () {
          that.loadAPI();
        });
      }

      target.closest("form").submit(function (e) {
        e.preventDefault();
        that.find(target.val());
      });

      if (opts.onKeyUp) {
        target.keyup(function () {
          that.find(target.val());
        });
      }
    },

    loadAPI: function () {
      if (!this.isInit) {
        // If isInit is falsy, check for data in localStore,
        // parse into memory, and declare isInit to be true.
        try {
          var subpathKey = getSubpathKey(this.subpath);
          this.index = localStorage.getItem("ghost_" + subpathKey + "_lunrIndex");
          this.blogData = localStorage.getItem("ghost_" + subpathKey + "_blogData");
          this.latestPost = localStorage.getItem("ghost_" + subpathKey + "_latestPost");
          if (this.latestPost && this.index && this.blogData) {
            this.latestPost = this.latestPost;
            this.index = lunr.Index.load(JSON.parse(this.index));
            this.blogData = JSON.parse(this.blogData);
            this.isInit = true;
          }
        } catch (e) {
          console.warn("ghostHunter: retrieve from localStorage failed: " + e);
        }
      }
      if (this.isInit) {
        // Check if there are new or edited posts
        var params = {
          limit: "all",
          filter: "updated_at:>'" + this.latestPost + "'",
          fields: "id"
        };
        var me = this;
        $.get(ghost.url.api("posts", params)).done(function (data) {
          if (data.posts.length > 0) {
            grabAndIndex.call(me);
          }
        });
      } else {
        // isInit is still false.
        grabAndIndex.call(this);
      }
    },

    find: function (value) {
      var searchResult = this.index.search(value);
      var results = $(this.results);
      var resultsData = [];
      results.empty();

      if (this.before) {
        this.before();
      }

      if (this.zeroResultsInfo || searchResult.length > 0) {
        if (this.displaySearchInfo) results.append(this.format(this.info_template, { amount: searchResult.length }));
      }

      for (var i = 0; i < searchResult.length; i++) {
        var lunrref = searchResult[i].ref;
        var postData = this.blogData[lunrref];

        if (postData) {
          results.append(this.format(this.result_template, _extends({}, postData, { id: lunrref })));
          resultsData.push(postData);
        } else {
          console.warn("ghostHunter: index/data mismatch. Ouch.");
        }
      }

      if (this.onComplete) {
        this.onComplete(resultsData);
      }
    },

    clear: function () {
      $(this.results).empty();
      this.target.val("");
    },

    format: function (t, d) {
      return t.replace(/{{([^{}]*)}}/g, function (a, b) {
        var r = d[b];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });
    }
  };
})(jQuery);

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYXJ0aWFscy9zaWRlLWJhci1ib2R5L3NlYXJjaC1ib3gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pxdWVyeS5naG9zdGh1bnRlci5qcyIsIndlYnBhY2s6Ly8vLi9wYXJ0aWFscy9zaWRlLWJhci1ib2R5L3NlYXJjaC1ib3gvc3R5bGUuc2NzcyJdLCJuYW1lcyI6WyIkIiwiJHNlYXJjaEJveCIsIiRzZWFyY2hJbnB1dCIsImZpbmQiLCIkcmVzdWx0cyIsIiRzZWFyY2hSZXN1bHRJdGVtcyIsImdob3N0SHVudGVyIiwicmVzdWx0cyIsImluZm9fdGVtcGxhdGUiLCJyZXN1bHRfdGVtcGxhdGUiLCJvbkNvbXBsZXRlIiwicGF0aG5hbWUiLCJsb2NhdGlvbiIsImVhY2giLCIkdGhpcyIsImF0dHIiLCJhZGRDbGFzcyIsIm9uIiwiZSIsImlzUG9zdFBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImlkIiwiZGF0YSIsInVybCIsImVtaXR0ZXIiLCJlbWl0IiwidGl0bGUiLCJzbHVnIiwidmFsIiwiaHRtbCIsImZvY3VzIiwiaGlzdG9yeSIsImxpc3RlbiIsIm5leHRUYWIiLCJzdGF0ZSIsInJlbW92ZUNsYXNzIiwiZmlsdGVyIiwiaWR4IiwiaXRlbSIsImx1bnIiLCJjb25maWciLCJidWlsZGVyIiwiQnVpbGRlciIsInBpcGVsaW5lIiwiYWRkIiwidHJpbW1lciIsInN0b3BXb3JkRmlsdGVyIiwic3RlbW1lciIsInNlYXJjaFBpcGVsaW5lIiwiY2FsbCIsImJ1aWxkIiwidmVyc2lvbiIsInV0aWxzIiwid2FybiIsImdsb2JhbCIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiYXNTdHJpbmciLCJvYmoiLCJ0b1N0cmluZyIsIkZpZWxkUmVmIiwiZG9jUmVmIiwiZmllbGROYW1lIiwic3RyaW5nVmFsdWUiLCJfc3RyaW5nVmFsdWUiLCJqb2luZXIiLCJmcm9tU3RyaW5nIiwicyIsIm4iLCJpbmRleE9mIiwiZmllbGRSZWYiLCJzbGljZSIsInByb3RvdHlwZSIsInVuZGVmaW5lZCIsImlkZiIsInBvc3RpbmciLCJkb2N1bWVudENvdW50IiwiZG9jdW1lbnRzV2l0aFRlcm0iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwieCIsIk1hdGgiLCJsb2ciLCJhYnMiLCJUb2tlbiIsInN0ciIsIm1ldGFkYXRhIiwidXBkYXRlIiwiZm4iLCJjbG9uZSIsInRva2VuaXplciIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJsZW4iLCJ0b2tlbnMiLCJzbGljZUVuZCIsInNsaWNlU3RhcnQiLCJjaGFyIiwiY2hhckF0Iiwic2xpY2VMZW5ndGgiLCJtYXRjaCIsInNlcGFyYXRvciIsInB1c2giLCJwb3NpdGlvbiIsImluZGV4IiwiUGlwZWxpbmUiLCJfc3RhY2siLCJyZWdpc3RlcmVkRnVuY3Rpb25zIiwiY3JlYXRlIiwicmVnaXN0ZXJGdW5jdGlvbiIsImxhYmVsIiwid2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkIiwiaXNSZWdpc3RlcmVkIiwibG9hZCIsInNlcmlhbGlzZWQiLCJmb3JFYWNoIiwiZm5OYW1lIiwiRXJyb3IiLCJmbnMiLCJhcmd1bWVudHMiLCJhZnRlciIsImV4aXN0aW5nRm4iLCJuZXdGbiIsInBvcyIsInNwbGljZSIsImJlZm9yZSIsInJlbW92ZSIsInJ1biIsInN0YWNrTGVuZ3RoIiwiaSIsInJlZHVjZSIsIm1lbW8iLCJ0b2tlbiIsImoiLCJyZXN1bHQiLCJjb25jYXQiLCJydW5TdHJpbmciLCJyZXNldCIsInRvSlNPTiIsIlZlY3RvciIsImVsZW1lbnRzIiwiX21hZ25pdHVkZSIsInBvc2l0aW9uRm9ySW5kZXgiLCJzdGFydCIsImVuZCIsInBpdm90UG9pbnQiLCJmbG9vciIsInBpdm90SW5kZXgiLCJpbnNlcnQiLCJpbnNlcnRJZHgiLCJ1cHNlcnQiLCJtYWduaXR1ZGUiLCJzdW1PZlNxdWFyZXMiLCJlbGVtZW50c0xlbmd0aCIsInNxcnQiLCJkb3QiLCJvdGhlclZlY3RvciIsImRvdFByb2R1Y3QiLCJhIiwiYiIsImFMZW4iLCJiTGVuIiwiYVZhbCIsImJWYWwiLCJzaW1pbGFyaXR5IiwidG9BcnJheSIsIm91dHB1dCIsInN0ZXAybGlzdCIsImF0aW9uYWwiLCJ0aW9uYWwiLCJlbmNpIiwiYW5jaSIsIml6ZXIiLCJibGkiLCJhbGxpIiwiZW50bGkiLCJlbGkiLCJvdXNsaSIsIml6YXRpb24iLCJhdGlvbiIsImF0b3IiLCJhbGlzbSIsIml2ZW5lc3MiLCJmdWxuZXNzIiwib3VzbmVzcyIsImFsaXRpIiwiaXZpdGkiLCJiaWxpdGkiLCJsb2dpIiwic3RlcDNsaXN0IiwiaWNhdGUiLCJhdGl2ZSIsImFsaXplIiwiaWNpdGkiLCJpY2FsIiwiZnVsIiwibmVzcyIsImMiLCJ2IiwiQyIsIlYiLCJtZ3IwIiwibWVxMSIsIm1ncjEiLCJzX3YiLCJyZV9tZ3IwIiwiUmVnRXhwIiwicmVfbWdyMSIsInJlX21lcTEiLCJyZV9zX3YiLCJyZV8xYSIsInJlMl8xYSIsInJlXzFiIiwicmUyXzFiIiwicmVfMWJfMiIsInJlMl8xYl8yIiwicmUzXzFiXzIiLCJyZTRfMWJfMiIsInJlXzFjIiwicmVfMiIsInJlXzMiLCJyZV80IiwicmUyXzQiLCJyZV81IiwicmVfNV8xIiwicmUzXzUiLCJwb3J0ZXJTdGVtbWVyIiwidyIsInN0ZW0iLCJzdWZmaXgiLCJmaXJzdGNoIiwicmUiLCJyZTIiLCJyZTMiLCJyZTQiLCJzdWJzdHIiLCJ0b1VwcGVyQ2FzZSIsInRlc3QiLCJyZXBsYWNlIiwiZnAiLCJleGVjIiwiZ2VuZXJhdGVTdG9wV29yZEZpbHRlciIsInN0b3BXb3JkcyIsIndvcmRzIiwic3RvcFdvcmQiLCJUb2tlblNldCIsImZpbmFsIiwiZWRnZXMiLCJfbmV4dElkIiwiZnJvbUFycmF5IiwiYXJyIiwiZmluaXNoIiwicm9vdCIsImZyb21DbGF1c2UiLCJjbGF1c2UiLCJmcm9tRnV6enlTdHJpbmciLCJ0ZXJtIiwiZWRpdERpc3RhbmNlIiwic3RhY2siLCJub2RlIiwiZWRpdHNSZW1haW5pbmciLCJmcmFtZSIsInBvcCIsIm5vRWRpdE5vZGUiLCJkZWxldGlvbk5vZGUiLCJzdWJzdGl0dXRpb25Ob2RlIiwiaW5zZXJ0aW9uTm9kZSIsImNoYXJBIiwiY2hhckIiLCJ0cmFuc3Bvc2VOb2RlIiwid2lsZGNhcmRGb3VuZCIsIm5leHQiLCJwcmVmaXgiLCJlZGdlIiwiX3N0ciIsImxhYmVscyIsInNvcnQiLCJpbnRlcnNlY3QiLCJxTm9kZSIsInFFZGdlcyIsInFMZW4iLCJuRWRnZXMiLCJuTGVuIiwicSIsInFFZGdlIiwibkVkZ2UiLCJwcmV2aW91c1dvcmQiLCJ1bmNoZWNrZWROb2RlcyIsIm1pbmltaXplZE5vZGVzIiwid29yZCIsImNvbW1vblByZWZpeCIsIm1pbmltaXplIiwiY2hpbGQiLCJuZXh0Tm9kZSIsInBhcmVudCIsImRvd25UbyIsImNoaWxkS2V5IiwiSW5kZXgiLCJhdHRycyIsImludmVydGVkSW5kZXgiLCJmaWVsZFZlY3RvcnMiLCJ0b2tlblNldCIsImZpZWxkcyIsInNlYXJjaCIsInF1ZXJ5U3RyaW5nIiwicXVlcnkiLCJwYXJzZXIiLCJRdWVyeVBhcnNlciIsInBhcnNlIiwiUXVlcnkiLCJtYXRjaGluZ0ZpZWxkcyIsInF1ZXJ5VmVjdG9ycyIsInRlcm1GaWVsZENhY2hlIiwiY2xhdXNlcyIsInRlcm1zIiwidXNlUGlwZWxpbmUiLCJtIiwidGVybVRva2VuU2V0IiwiZXhwYW5kZWRUZXJtcyIsImV4cGFuZGVkVGVybSIsInRlcm1JbmRleCIsIl9pbmRleCIsImsiLCJmaWVsZCIsImZpZWxkUG9zdGluZyIsIm1hdGNoaW5nRG9jdW1lbnRSZWZzIiwidGVybUZpZWxkIiwiYm9vc3QiLCJsIiwibWF0Y2hpbmdEb2N1bWVudFJlZiIsIm1hdGNoaW5nRmllbGRSZWYiLCJmaWVsZE1hdGNoIiwiTWF0Y2hEYXRhIiwibWF0Y2hpbmdGaWVsZFJlZnMiLCJtYXRjaGVzIiwiZmllbGRWZWN0b3IiLCJzY29yZSIsImRvY01hdGNoIiwibWF0Y2hEYXRhIiwiY29tYmluZSIsInJlZiIsInNlcmlhbGl6ZWRJbmRleCIsInNlcmlhbGl6ZWRWZWN0b3JzIiwic2VyaWFsaXplZEludmVydGVkSW5kZXgiLCJ0b2tlblNldEJ1aWxkZXIiLCJ0dXBsZSIsIl9yZWYiLCJfZmllbGRzIiwiZmllbGRUZXJtRnJlcXVlbmNpZXMiLCJmaWVsZExlbmd0aHMiLCJfYiIsIl9rMSIsIm1ldGFkYXRhV2hpdGVsaXN0IiwibnVtYmVyIiwiazEiLCJkb2MiLCJmaWVsZFRlcm1zIiwibWV0YWRhdGFLZXkiLCJjYWxjdWxhdGVBdmVyYWdlRmllbGRMZW5ndGhzIiwiZmllbGRSZWZzIiwibnVtYmVyT2ZGaWVsZHMiLCJhY2N1bXVsYXRvciIsImRvY3VtZW50c1dpdGhGaWVsZCIsImF2ZXJhZ2VGaWVsZExlbmd0aCIsImNyZWF0ZUZpZWxkVmVjdG9ycyIsImZpZWxkUmVmc0xlbmd0aCIsInRlcm1JZGZDYWNoZSIsImZpZWxkTGVuZ3RoIiwidGVybUZyZXF1ZW5jaWVzIiwidGVybXNMZW5ndGgiLCJ0ZiIsInNjb3JlV2l0aFByZWNpc2lvbiIsInJvdW5kIiwiY3JlYXRlVG9rZW5TZXQiLCJ1c2UiLCJhcmdzIiwidW5zaGlmdCIsImFwcGx5IiwiY2xvbmVkTWV0YWRhdGEiLCJtZXRhZGF0YUtleXMiLCJrZXkiLCJvdGhlck1hdGNoRGF0YSIsImFsbEZpZWxkcyIsIndpbGRjYXJkIiwiU3RyaW5nIiwiTk9ORSIsIkxFQURJTkciLCJUUkFJTElORyIsIm9wdGlvbnMiLCJRdWVyeVBhcnNlRXJyb3IiLCJuYW1lIiwiUXVlcnlMZXhlciIsImxleGVtZXMiLCJlc2NhcGVDaGFyUG9zaXRpb25zIiwibGV4VGV4dCIsInNsaWNlU3RyaW5nIiwic3ViU2xpY2VzIiwiam9pbiIsInR5cGUiLCJlc2NhcGVDaGFyYWN0ZXIiLCJFT1MiLCJ3aWR0aCIsImlnbm9yZSIsImJhY2t1cCIsImFjY2VwdERpZ2l0UnVuIiwiY2hhckNvZGUiLCJjaGFyQ29kZUF0IiwibW9yZSIsIkZJRUxEIiwiVEVSTSIsIkVESVRfRElTVEFOQ0UiLCJCT09TVCIsImxleEZpZWxkIiwibGV4ZXIiLCJsZXhUZXJtIiwibGV4RWRpdERpc3RhbmNlIiwibGV4Qm9vc3QiLCJsZXhFT1MiLCJ0ZXJtU2VwYXJhdG9yIiwiY3VycmVudENsYXVzZSIsImxleGVtZUlkeCIsInBhcnNlRmllbGRPclRlcm0iLCJwZWVrTGV4ZW1lIiwiY29uc3VtZUxleGVtZSIsImxleGVtZSIsIm5leHRDbGF1c2UiLCJjb21wbGV0ZWRDbGF1c2UiLCJwYXJzZUZpZWxkIiwicGFyc2VUZXJtIiwiZXJyb3JNZXNzYWdlIiwicG9zc2libGVGaWVsZHMiLCJmIiwibmV4dExleGVtZSIsInBhcnNlRWRpdERpc3RhbmNlIiwicGFyc2VCb29zdCIsInBhcnNlSW50IiwiaXNOYU4iLCJvcHRzIiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJwbHVnaW5NZXRob2RzIiwiaW5pdCIsInJlc3VsdHNEYXRhIiwib25QYWdlTG9hZCIsIm9uS2V5VXAiLCJkaXNwbGF5U2VhcmNoSW5mbyIsInplcm9SZXN1bHRzSW5mbyIsImluY2x1ZGVwYWdlcyIsImZpbHRlcmZpZWxkcyIsInN1YnBhdGgiLCJpdGVtX3ByZXByb2Nlc3NvciIsImluZGV4aW5nX3N0YXJ0IiwiaW5kZXhpbmdfZW5kIiwicHJldHR5RGF0ZSIsImRhdGUiLCJkIiwiRGF0ZSIsIm1vbnRoTmFtZXMiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImdldFN1YnBhdGhLZXkiLCJncmFiQW5kSW5kZXgiLCJibG9nRGF0YSIsImxhdGVzdFBvc3QiLCJwYXJhbXMiLCJsaW1pdCIsImluY2x1ZGUiLCJmb3JtYXRzIiwibWUiLCJnZXQiLCJnaG9zdCIsImFwaSIsImRvbmUiLCJpZHhTcmMiLCJwb3N0cyIsImFycmF5SXRlbSIsIml0ZW1EYXRlIiwidXBkYXRlZF9hdCIsImdldFRpbWUiLCJyZWNvcmRlZERhdGUiLCJ0YWdfYXJyIiwidGFncyIsIm1ldGFfZGVzY3JpcHRpb24iLCJjYXRlZ29yeSIsInBhcnNlZERhdGEiLCJkZXNjcmlwdGlvbiIsInBsYWludGV4dCIsInB1YkRhdGUiLCJwdWJsaXNoZWRfYXQiLCJ0YWciLCJsb2NhbFVybCIsImxpbmsiLCJhc3NpZ24iLCJzdWJwYXRoS2V5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc0luaXQiLCJ0YXJnZXQiLCJ0aGF0IiwibWlhbSIsImxvYWRBUEkiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiY2xvc2VzdCIsInN1Ym1pdCIsImtleXVwIiwiZ2V0SXRlbSIsInZhbHVlIiwic2VhcmNoUmVzdWx0IiwiZW1wdHkiLCJhcHBlbmQiLCJmb3JtYXQiLCJhbW91bnQiLCJsdW5ycmVmIiwicG9zdERhdGEiLCJjbGVhciIsInIiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsRUFBRSxZQUFXO0FBQ1gsUUFBTUMsYUFBYUQsRUFBRSxlQUFGLENBQW5CO0FBQ0EsUUFBTUUsZUFBZUQsV0FBV0UsSUFBWCxDQUFnQixpQkFBaEIsQ0FBckI7QUFDQSxRQUFNQyxXQUFXSixFQUFFLG1CQUFGLENBQWpCO0FBQ0EsTUFBSUssa0JBQUo7O0FBRUFILGVBQWFJLFdBQWIsQ0FBeUI7QUFDdkJDLGFBQVMsbUJBRGM7QUFFdkJDLG1CQUFnQixpR0FGTztBQUd2QkMscUJBQWtCOzs7OztLQUhLO0FBU3ZCQyxnQkFBWUgsV0FBVztBQUNyQkYsMkJBQXFCSixXQUFXRSxJQUFYLENBQWdCLHVCQUFoQixDQUFyQjtBQUNBLFlBQU1RLFdBQVdDLFNBQVNELFFBQTFCO0FBQ0FOLHlCQUFtQlEsSUFBbkIsQ0FBd0IsWUFBVztBQUNqQyxjQUFNQyxRQUFRZCxFQUFFLElBQUYsQ0FBZDtBQUNBYyxjQUFNQyxJQUFOLENBQVcsTUFBWCxNQUF1QkosUUFBdkIsSUFBbUNHLE1BQU1FLFFBQU4sQ0FBZSxRQUFmLENBQW5DO0FBQ0QsT0FIRDtBQUlEO0FBaEJzQixHQUF6Qjs7QUFtQkFmLGFBQ0dnQixFQURILENBQ00sT0FETixFQUNlLHVCQURmLEVBQ3dD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LE1BQUwsQ0FBWSxLQUFLOWYsZUFBakIsZUFBc0NpZ0IsUUFBdEMsSUFBZ0RyZixJQUFJb2YsT0FBcEQsSUFBZjtBQUNBMUUsc0JBQVlwVixJQUFaLENBQWlCK1osUUFBakI7QUFDRCxTQUhELE1BR087QUFDTGxkLGtCQUFRSCxJQUFSLENBQWEseUNBQWI7QUFDRDtBQUNGOztBQUVELFVBQUksS0FBSzNDLFVBQVQsRUFBcUI7QUFDbkIsYUFBS0EsVUFBTCxDQUFnQnFiLFdBQWhCO0FBQ0Q7QUFDRixLQTFHaUI7O0FBNEdsQjRFLFdBQU8sWUFBVztBQUNoQjNnQixRQUFFLEtBQUtPLE9BQVAsRUFBZ0I4ZixLQUFoQjtBQUNBLFdBQUtaLE1BQUwsQ0FBWTdkLEdBQVosQ0FBZ0IsRUFBaEI7QUFDRCxLQS9HaUI7O0FBaUhsQjJlLFlBQVEsVUFBU3hhLENBQVQsRUFBWTZXLENBQVosRUFBZTtBQUNyQixhQUFPN1csRUFBRW9KLE9BQUYsQ0FBVSxlQUFWLEVBQTJCLFVBQVNoRixDQUFULEVBQVlDLENBQVosRUFBZTtBQUMvQyxZQUFJd1csSUFBSWhFLEVBQUV4UyxDQUFGLENBQVI7QUFDQSxlQUFPLE9BQU93VyxDQUFQLEtBQWEsUUFBYixJQUF5QixPQUFPQSxDQUFQLEtBQWEsUUFBdEMsR0FBaURBLENBQWpELEdBQXFEelcsQ0FBNUQ7QUFDRCxPQUhNLENBQVA7QUFJRDtBQXRIaUIsR0FBcEI7QUF3SEQsQ0FwdUdELEVBb3VHRzBXLE1BcHVHSCxFOzs7Ozs7O0FDTkEseUMiLCJmaWxlIjoiY2h1bmsuMC4xN2NiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnaG9zdEh1bnRlciBmcm9tICdhc3NldHMvanF1ZXJ5Lmdob3N0aHVudGVyJ1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnXG5pbXBvcnQgeyBpc1Bvc3RQYWdlIH0gZnJvbSAnIy91dGlscydcbmltcG9ydCBoaXN0b3J5IGZyb20gJyMvaGlzdG9yeSdcblxuJChmdW5jdGlvbigpIHtcbiAgY29uc3QgJHNlYXJjaEJveCA9ICQoJyNKLXNlYXJjaC1ib3gnKVxuICBjb25zdCAkc2VhcmNoSW5wdXQgPSAkc2VhcmNoQm94LmZpbmQoJy5KLWlucHV0LXNlYXJjaCcpXG4gIGNvbnN0ICRyZXN1bHRzID0gJCgnI0otc2VhcmNoLXJlc3VsdHMnKVxuICBsZXQgJHNlYXJjaFJlc3VsdEl0ZW1zXG5cbiAgJHNlYXJjaElucHV0Lmdob3N0SHVudGVyKHtcbiAgICByZXN1bHRzOiAnI0otc2VhcmNoLXJlc3VsdHMnLFxuICAgIGluZm9fdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtYW1vdW50XCI+PGRpdiBjbGFzcz1cImxpZ2h0XCI+PGI+e3thbW91bnR9fTwvYj4gcG9zdHMgZm91bmQ8L2Rpdj48L2Rpdj5gLFxuICAgIHJlc3VsdF90ZW1wbGF0ZTogYFxuICAgICAgPGEgaHJlZj1cInt7bGlua319XCIgZGF0YS1pZD1cInt7aWR9fVwiIGNsYXNzPVwic2VhcmNoLXJlc3VsdC1pdGVtIEotc2VhcmNoLXJlc3VsdC1pdGVtXCIgdGl0bGU9XCJ7e3RpdGxlfX1cIj5cbiAgICAgICAgPGgzPnt7dGl0bGV9fTwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaWdodGVyXCI+e3twdWJEYXRlfX08L2Rpdj5cbiAgICAgIDwvYT5cbiAgICBgLFxuICAgIG9uQ29tcGxldGU6IHJlc3VsdHMgPT4ge1xuICAgICAgJHNlYXJjaFJlc3VsdEl0ZW1zID0gJHNlYXJjaEJveC5maW5kKCcuSi1zZWFyY2gtcmVzdWx0LWl0ZW0nKVxuICAgICAgY29uc3QgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZVxuICAgICAgJHNlYXJjaFJlc3VsdEl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKVxuICAgICAgICAkdGhpcy5hdHRyKCdocmVmJykgPT09IHBhdGhuYW1lICYmICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgJHNlYXJjaEJveFxuICAgIC5vbignY2xpY2snLCAnLkotc2VhcmNoLXJlc3VsdC1pdGVtJywgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpXG4gICAgICBpZiAoaXNQb3N0UGFnZSgpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IGlkID0gJHRoaXMuZGF0YSgnaWQnKVxuICAgICAgICBjb25zdCB1cmwgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgICAgZW1pdHRlci5lbWl0KCdhZGQtcG9zdC10YWInLCB7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdXJsLFxuICAgICAgICAgIHRpdGxlOiAkdGhpcy5hdHRyKCd0aXRsZScpLFxuICAgICAgICAgIHNsdWc6ICcnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgICAub24oJ2NsaWNrJywgJy5KLXNlYXJjaC1jbGVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgJHNlYXJjaElucHV0LnZhbCgnJylcbiAgICAgICRyZXN1bHRzLmh0bWwoJycpXG4gICAgICAkc2VhcmNoSW5wdXQuZm9jdXMoKVxuICAgIH0pXG5cbiAgaGlzdG9yeS5saXN0ZW4obG9jYXRpb24gPT4ge1xuICAgIGNvbnN0IG5leHRUYWIgPSBsb2NhdGlvbi5zdGF0ZVxuXG4gICAgJHNlYXJjaFJlc3VsdEl0ZW1zICYmXG4gICAgICAkc2VhcmNoUmVzdWx0SXRlbXNcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmlsdGVyKChpZHgsIGl0ZW0pID0+IHtcbiAgICAgICAgICByZXR1cm4gJChpdGVtKS5kYXRhKCdpZCcpID09PSBuZXh0VGFiLmlkXG4gICAgICAgIH0pXG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgfSlcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYXJ0aWFscy9zaWRlLWJhci1ib2R5L3NlYXJjaC1ib3gvaW5kZXguanMiLCIvKipcbiAqIGdob3N0SHVudGVyIC0gMC40LjBcbiAqIENvcHlyaWdodCAoQykgMjAxNCBKYW1hbCBOZXVmZWxkIChqYW1hbEBpMTF1Lm1lKVxuICogTUlUIExpY2Vuc2VkXG4gKiBAbGljZW5zZVxuICovXG4oZnVuY3Rpb24oJCkge1xuICAvKipcbiAgICogbHVuciAtIGh0dHA6Ly9sdW5yanMuY29tIC0gQSBiaXQgbGlrZSBTb2xyLCBidXQgbXVjaCBzbWFsbGVyIGFuZCBub3QgYXMgYnJpZ2h0IC0gMi4xLjVcbiAgICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICAgKiBAbGljZW5zZSBNSVRcbiAgICovXG5cbiAgdmFyIGx1bnIgPSAoZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogQSBjb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY29uZmlndXJpbmcgYW5kIGNvbnN0cnVjdGluZ1xuICAgICAqIGEgbmV3IGx1bnIgSW5kZXguXG4gICAgICpcbiAgICAgKiBBIGx1bnIuQnVpbGRlciBpbnN0YW5jZSBpcyBjcmVhdGVkIGFuZCB0aGUgcGlwZWxpbmUgc2V0dXBcbiAgICAgKiB3aXRoIGEgdHJpbW1lciwgc3RvcCB3b3JkIGZpbHRlciBhbmQgc3RlbW1lci5cbiAgICAgKlxuICAgICAqIFRoaXMgYnVpbGRlciBvYmplY3QgaXMgeWllbGRlZCB0byB0aGUgY29uZmlndXJhdGlvbiBmdW5jdGlvblxuICAgICAqIHRoYXQgaXMgcGFzc2VkIGFzIGEgcGFyYW1ldGVyLCBhbGxvd2luZyB0aGUgbGlzdCBvZiBmaWVsZHNcbiAgICAgKiBhbmQgb3RoZXIgYnVpbGRlciBwYXJhbWV0ZXJzIHRvIGJlIGN1c3RvbWlzZWQuXG4gICAgICpcbiAgICAgKiBBbGwgZG9jdW1lbnRzIF9tdXN0XyBiZSBhZGRlZCB3aXRoaW4gdGhlIHBhc3NlZCBjb25maWcgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgIHRoaXMuZmllbGQoJ3RpdGxlJylcbiAgICAgKiAgIHRoaXMuZmllbGQoJ2JvZHknKVxuICAgICAqICAgdGhpcy5yZWYoJ2lkJylcbiAgICAgKlxuICAgICAqICAgZG9jdW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGRvYykge1xuICAgICAqICAgICB0aGlzLmFkZChkb2MpXG4gICAgICogICB9LCB0aGlzKVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBsdW5yLkJ1aWxkZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgbHVuci5QaXBlbGluZX1cbiAgICAgKiBAc2VlIHtAbGluayBsdW5yLnRyaW1tZXJ9XG4gICAgICogQHNlZSB7QGxpbmsgbHVuci5zdG9wV29yZEZpbHRlcn1cbiAgICAgKiBAc2VlIHtAbGluayBsdW5yLnN0ZW1tZXJ9XG4gICAgICogQG5hbWVzcGFjZSB7ZnVuY3Rpb259IGx1bnJcbiAgICAgKi9cbiAgICB2YXIgbHVuciA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgdmFyIGJ1aWxkZXIgPSBuZXcgbHVuci5CdWlsZGVyKCk7XG5cbiAgICAgIGJ1aWxkZXIucGlwZWxpbmUuYWRkKGx1bnIudHJpbW1lciwgbHVuci5zdG9wV29yZEZpbHRlciwgbHVuci5zdGVtbWVyKTtcblxuICAgICAgYnVpbGRlci5zZWFyY2hQaXBlbGluZS5hZGQobHVuci5zdGVtbWVyKTtcblxuICAgICAgY29uZmlnLmNhbGwoYnVpbGRlciwgYnVpbGRlcik7XG4gICAgICByZXR1cm4gYnVpbGRlci5idWlsZCgpO1xuICAgIH07XG5cbiAgICBsdW5yLnZlcnNpb24gPSBcIjIuMS41XCI7XG4gICAgLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuICAgIC8qKlxuICAgICAqIEEgbmFtZXNwYWNlIGNvbnRhaW5pbmcgdXRpbHMgZm9yIHRoZSByZXN0IG9mIHRoZSBsdW5yIGxpYnJhcnlcbiAgICAgKi9cbiAgICBsdW5yLnV0aWxzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBQcmludCBhIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgY29uc29sZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGJlIHByaW50ZWQuXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgbHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGdsb2JhbC5jb25zb2xlICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICAgIH0pKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBJbiB0aGUgY2FzZSBvZiBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHRoZSBmdW5jdGlvbiByZXR1cm5zXG4gICAgICogdGhlIGVtcHR5IHN0cmluZywgaW4gYWxsIG90aGVyIGNhc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZ1xuICAgICAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FueX0gb2JqIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBhIHN0cmluZy5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBsdW5yLnV0aWxzLmFzU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqID09PSB2b2lkIDAgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG4gICAgbHVuci5GaWVsZFJlZiA9IGZ1bmN0aW9uKGRvY1JlZiwgZmllbGROYW1lLCBzdHJpbmdWYWx1ZSkge1xuICAgICAgdGhpcy5kb2NSZWYgPSBkb2NSZWY7XG4gICAgICB0aGlzLmZpZWxkTmFtZSA9IGZpZWxkTmFtZTtcbiAgICAgIHRoaXMuX3N0cmluZ1ZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgfTtcblxuICAgIGx1bnIuRmllbGRSZWYuam9pbmVyID0gXCIvXCI7XG5cbiAgICBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcgPSBmdW5jdGlvbihzKSB7XG4gICAgICB2YXIgbiA9IHMuaW5kZXhPZihsdW5yLkZpZWxkUmVmLmpvaW5lcik7XG5cbiAgICAgIGlmIChuID09PSAtMSkge1xuICAgICAgICB0aHJvdyBcIm1hbGZvcm1lZCBmaWVsZCByZWYgc3RyaW5nXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBmaWVsZFJlZiA9IHMuc2xpY2UoMCwgbiksXG4gICAgICAgIGRvY1JlZiA9IHMuc2xpY2UobiArIDEpO1xuXG4gICAgICByZXR1cm4gbmV3IGx1bnIuRmllbGRSZWYoZG9jUmVmLCBmaWVsZFJlZiwgcyk7XG4gICAgfTtcblxuICAgIGx1bnIuRmllbGRSZWYucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fc3RyaW5nVmFsdWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3N0cmluZ1ZhbHVlID0gdGhpcy5maWVsZE5hbWUgKyBsdW5yLkZpZWxkUmVmLmpvaW5lciArIHRoaXMuZG9jUmVmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fc3RyaW5nVmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgaW52ZXJzZSBkb2N1bWVudCBmcmVxdWVuY3kgZm9yXG4gICAgICogYSBwb3N0aW5nLiBUaGlzIGlzIHNoYXJlZCBiZXR3ZWVuIHRoZSBidWlsZGVyIGFuZCB0aGUgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHBvc3RpbmcgLSBUaGUgcG9zdGluZyBmb3IgYSBnaXZlbiB0ZXJtXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRvY3VtZW50Q291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGRvY3VtZW50cy5cbiAgICAgKi9cbiAgICBsdW5yLmlkZiA9IGZ1bmN0aW9uKHBvc3RpbmcsIGRvY3VtZW50Q291bnQpIHtcbiAgICAgIHZhciBkb2N1bWVudHNXaXRoVGVybSA9IDA7XG5cbiAgICAgIGZvciAodmFyIGZpZWxkTmFtZSBpbiBwb3N0aW5nKSB7XG4gICAgICAgIGlmIChmaWVsZE5hbWUgPT0gXCJfaW5kZXhcIikgY29udGludWU7IC8vIElnbm9yZSB0aGUgdGVybSBpbmRleCwgaXRzIG5vdCBhIGZpZWxkXG4gICAgICAgIGRvY3VtZW50c1dpdGhUZXJtICs9IE9iamVjdC5rZXlzKHBvc3RpbmdbZmllbGROYW1lXSkubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICB2YXIgeCA9XG4gICAgICAgIChkb2N1bWVudENvdW50IC0gZG9jdW1lbnRzV2l0aFRlcm0gKyAwLjUpIC8gKGRvY3VtZW50c1dpdGhUZXJtICsgMC41KTtcblxuICAgICAgcmV0dXJuIE1hdGgubG9nKDEgKyBNYXRoLmFicyh4KSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgdG9rZW4gd3JhcHMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB0b2tlblxuICAgICAqIGFzIGl0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZSB0ZXh0IHByb2Nlc3NpbmcgcGlwZWxpbmUuXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3N0cj0nJ10gLSBUaGUgc3RyaW5nIHRva2VuIGJlaW5nIHdyYXBwZWQuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YT17fV0gLSBNZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0b2tlbi5cbiAgICAgKi9cbiAgICBsdW5yLlRva2VuID0gZnVuY3Rpb24oc3RyLCBtZXRhZGF0YSkge1xuICAgICAgdGhpcy5zdHIgPSBzdHIgfHwgXCJcIjtcbiAgICAgIHRoaXMubWV0YWRhdGEgPSBtZXRhZGF0YSB8fCB7fTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdG9rZW4gc3RyaW5nIHRoYXQgaXMgYmVpbmcgd3JhcHBlZCBieSB0aGlzIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgbHVuci5Ub2tlbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQSB0b2tlbiB1cGRhdGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIHVwZGF0aW5nIG9yIG9wdGlvbmFsbHlcbiAgICAgKiB3aGVuIGNsb25pbmcgYSB0b2tlbi5cbiAgICAgKlxuICAgICAqIEBjYWxsYmFjayBsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtZXRhZGF0YSAtIEFsbCBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0b2tlbi5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHRvIHRoZSB3cmFwcGVkIHN0cmluZyB0b2tlbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdG9rZW4udXBkYXRlKGZ1bmN0aW9uIChzdHIsIG1ldGFkYXRhKSB7XG4gICAgICogICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKClcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIHRva2VuIHN0cmluZy5cbiAgICAgKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAgICAgKi9cbiAgICBsdW5yLlRva2VuLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihmbikge1xuICAgICAgdGhpcy5zdHIgPSBmbih0aGlzLnN0ciwgdGhpcy5tZXRhZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoaXMgdG9rZW4uIE9wdGlvbmFsbHkgYSBmdW5jdGlvbiBjYW4gYmVcbiAgICAgKiBhcHBsaWVkIHRvIHRoZSBjbG9uZWQgdG9rZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2x1bnIuVG9rZW5+dXBkYXRlRnVuY3Rpb259IFtmbl0gLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byB0aGUgY2xvbmVkIHRva2VuLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlRva2VufVxuICAgICAqL1xuICAgIGx1bnIuVG9rZW4ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZuID1cbiAgICAgICAgZm4gfHxcbiAgICAgICAgZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgcmV0dXJuIG5ldyBsdW5yLlRva2VuKGZuKHRoaXMuc3RyLCB0aGlzLm1ldGFkYXRhKSwgdGhpcy5tZXRhZGF0YSk7XG4gICAgfTtcbiAgICAvKiFcbiAqIGx1bnIudG9rZW5pemVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gZm9yIHNwbGl0dGluZyBhIHN0cmluZyBpbnRvIHRva2VucyByZWFkeSB0byBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogdGhlIHNlYXJjaCBpbmRleC4gVXNlcyBgbHVuci50b2tlbml6ZXIuc2VwYXJhdG9yYCB0byBzcGxpdCBzdHJpbmdzLCBjaGFuZ2VcbiAgICAgKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgaG93IHN0cmluZ3MgYXJlIHNwbGl0IGludG8gdG9rZW5zLlxuICAgICAqXG4gICAgICogVGhpcyB0b2tlbml6ZXIgd2lsbCBjb252ZXJ0IGl0cyBwYXJhbWV0ZXIgdG8gYSBzdHJpbmcgYnkgY2FsbGluZyBgdG9TdHJpbmdgIGFuZFxuICAgICAqIHRoZW4gd2lsbCBzcGxpdCB0aGlzIHN0cmluZyBvbiB0aGUgY2hhcmFjdGVyIGluIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgLlxuICAgICAqIEFycmF5cyB3aWxsIGhhdmUgdGhlaXIgZWxlbWVudHMgY29udmVydGVkIHRvIHN0cmluZ3MgYW5kIHdyYXBwZWQgaW4gYSBsdW5yLlRva2VuLlxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7PyhzdHJpbmd8b2JqZWN0fG9iamVjdFtdKX0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IGludG8gdG9rZW5zXG4gICAgICogQHJldHVybnMge2x1bnIuVG9rZW5bXX1cbiAgICAgKi9cbiAgICBsdW5yLnRva2VuaXplciA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iaiA9PSBudWxsIHx8IG9iaiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IGx1bnIuVG9rZW4obHVuci51dGlscy5hc1N0cmluZyh0KS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHIgPSBvYmpcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgbGVuID0gc3RyLmxlbmd0aCxcbiAgICAgICAgdG9rZW5zID0gW107XG5cbiAgICAgIGZvciAodmFyIHNsaWNlRW5kID0gMCwgc2xpY2VTdGFydCA9IDA7IHNsaWNlRW5kIDw9IGxlbjsgc2xpY2VFbmQrKykge1xuICAgICAgICB2YXIgY2hhciA9IHN0ci5jaGFyQXQoc2xpY2VFbmQpLFxuICAgICAgICAgIHNsaWNlTGVuZ3RoID0gc2xpY2VFbmQgLSBzbGljZVN0YXJ0O1xuXG4gICAgICAgIGlmIChjaGFyLm1hdGNoKGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcikgfHwgc2xpY2VFbmQgPT0gbGVuKSB7XG4gICAgICAgICAgaWYgKHNsaWNlTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goXG4gICAgICAgICAgICAgIG5ldyBsdW5yLlRva2VuKHN0ci5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCksIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW3NsaWNlU3RhcnQsIHNsaWNlTGVuZ3RoXSxcbiAgICAgICAgICAgICAgICBpbmRleDogdG9rZW5zLmxlbmd0aFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzbGljZVN0YXJ0ID0gc2xpY2VFbmQgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXBhcmF0b3IgdXNlZCB0byBzcGxpdCBhIHN0cmluZyBpbnRvIHRva2Vucy4gT3ZlcnJpZGUgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZlxuICAgICAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHNlZSBsdW5yLnRva2VuaXplclxuICAgICAqL1xuICAgIGx1bnIudG9rZW5pemVyLnNlcGFyYXRvciA9IC9bXFxzXFwtXSsvO1xuICAgIC8qIVxuICAgICogbHVuci5QaXBlbGluZVxuICAgICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICAgICovXG5cbiAgICAvKipcbiAgICAgKiBsdW5yLlBpcGVsaW5lcyBtYWludGFpbiBhbiBvcmRlcmVkIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGJlIGFwcGxpZWQgdG8gYWxsXG4gICAgICogdG9rZW5zIGluIGRvY3VtZW50cyBlbnRlcmluZyB0aGUgc2VhcmNoIGluZGV4IGFuZCBxdWVyaWVzIGJlaW5nIHJhbiBhZ2FpbnN0XG4gICAgICogdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleCBjcmVhdGVkIHdpdGggdGhlIGx1bnIgc2hvcnRjdXQgd2lsbCBjb250YWluIGFcbiAgICAgKiBwaXBlbGluZSB3aXRoIGEgc3RvcCB3b3JkIGZpbHRlciBhbmQgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLiBFeHRyYVxuICAgICAqIGZ1bmN0aW9ucyBjYW4gYmUgYWRkZWQgYmVmb3JlIG9yIGFmdGVyIGVpdGhlciBvZiB0aGVzZSBmdW5jdGlvbnMgb3IgdGhlc2VcbiAgICAgKiBkZWZhdWx0IGZ1bmN0aW9ucyBjYW4gYmUgcmVtb3ZlZC5cbiAgICAgKlxuICAgICAqIFdoZW4gcnVuIHRoZSBwaXBlbGluZSB3aWxsIGNhbGwgZWFjaCBmdW5jdGlvbiBpbiB0dXJuLCBwYXNzaW5nIGEgdG9rZW4sIHRoZVxuICAgICAqIGluZGV4IG9mIHRoYXQgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIGxpc3Qgb2YgYWxsIHRva2VucyBhbmQgZmluYWxseSBhIGxpc3Qgb2ZcbiAgICAgKiBhbGwgdGhlIG9yaWdpbmFsIHRva2Vucy5cbiAgICAgKlxuICAgICAqIFRoZSBvdXRwdXQgb2YgZnVuY3Rpb25zIGluIHRoZSBwaXBlbGluZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBmdW5jdGlvblxuICAgICAqIGluIHRoZSBwaXBlbGluZS4gVG8gZXhjbHVkZSBhIHRva2VuIGZyb20gZW50ZXJpbmcgdGhlIGluZGV4IHRoZSBmdW5jdGlvblxuICAgICAqIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLCB0aGUgcmVzdCBvZiB0aGUgcGlwZWxpbmUgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGhcbiAgICAgKiB0aGlzIHRva2VuLlxuICAgICAqXG4gICAgICogRm9yIHNlcmlhbGlzYXRpb24gb2YgcGlwZWxpbmVzIHRvIHdvcmssIGFsbCBmdW5jdGlvbnMgdXNlZCBpbiBhbiBpbnN0YW5jZSBvZlxuICAgICAqIGEgcGlwZWxpbmUgc2hvdWxkIGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLiBSZWdpc3RlcmVkIGZ1bmN0aW9ucyBjYW5cbiAgICAgKiB0aGVuIGJlIGxvYWRlZC4gSWYgdHJ5aW5nIHRvIGxvYWQgYSBzZXJpYWxpc2VkIHBpcGVsaW5lIHRoYXQgdXNlcyBmdW5jdGlvbnNcbiAgICAgKiB0aGF0IGFyZSBub3QgcmVnaXN0ZXJlZCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAgICAgKlxuICAgICAqIElmIG5vdCBwbGFubmluZyBvbiBzZXJpYWxpc2luZyB0aGUgcGlwZWxpbmUgdGhlbiByZWdpc3RlcmluZyBwaXBlbGluZSBmdW5jdGlvbnNcbiAgICAgKiBpcyBub3QgbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgbHVuci5QaXBlbGluZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICB9O1xuXG4gICAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8qKlxuICAgICAqIEEgcGlwZWxpbmUgZnVuY3Rpb24gbWFwcyBsdW5yLlRva2VuIHRvIGx1bnIuVG9rZW4uIEEgbHVuci5Ub2tlbiBjb250YWlucyB0aGUgdG9rZW5cbiAgICAgKiBzdHJpbmcgYXMgd2VsbCBhcyBhbGwga25vd24gbWV0YWRhdGEuIEEgcGlwZWxpbmUgZnVuY3Rpb24gY2FuIG11dGF0ZSB0aGUgdG9rZW4gc3RyaW5nXG4gICAgICogb3IgbXV0YXRlIChvciBhZGQpIG1ldGFkYXRhIGZvciBhIGdpdmVuIHRva2VuLlxuICAgICAqXG4gICAgICogQSBwaXBlbGluZSBmdW5jdGlvbiBjYW4gaW5kaWNhdGUgdGhhdCB0aGUgcGFzc2VkIHRva2VuIHNob3VsZCBiZSBkaXNjYXJkZWQgYnkgcmV0dXJuaW5nXG4gICAgICogbnVsbC4gVGhpcyB0b2tlbiB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gYW55IGRvd25zdHJlYW0gcGlwZWxpbmUgZnVuY3Rpb25zIGFuZCB3aWxsIG5vdCBiZVxuICAgICAqIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIE11bHRpcGxlIHRva2VucyBjYW4gYmUgcmV0dXJuZWQgYnkgcmV0dXJuaW5nIGFuIGFycmF5IG9mIHRva2Vucy4gRWFjaCB0b2tlbiB3aWxsIGJlIHBhc3NlZFxuICAgICAqIHRvIGFueSBkb3duc3RyZWFtIHBpcGVsaW5lIGZ1bmN0aW9ucyBhbmQgYWxsIHdpbGwgcmV0dXJuZWQgdG9rZW5zIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQW55IG51bWJlciBvZiBwaXBlbGluZSBmdW5jdGlvbnMgbWF5IGJlIGNoYWluZWQgdG9nZXRoZXIgdXNpbmcgYSBsdW5yLlBpcGVsaW5lLlxuICAgICAqXG4gICAgICogQGludGVyZmFjZSBsdW5yLlBpcGVsaW5lRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIC0gQSB0b2tlbiBmcm9tIHRoZSBkb2N1bWVudCBiZWluZyBwcm9jZXNzZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGkgLSBUaGUgaW5kZXggb2YgdGhpcyB0b2tlbiBpbiB0aGUgY29tcGxldGUgbGlzdCBvZiB0b2tlbnMgZm9yIHRoaXMgZG9jdW1lbnQvZmllbGQuXG4gICAgICogQHBhcmFtIHtsdW5yLlRva2VuW119IHRva2VucyAtIEFsbCB0b2tlbnMgZm9yIHRoaXMgZG9jdW1lbnQvZmllbGQuXG4gICAgICogQHJldHVybnMgeyg/bHVuci5Ub2tlbnxsdW5yLlRva2VuW10pfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYSBmdW5jdGlvbiB3aXRoIHRoZSBwaXBlbGluZS5cbiAgICAgKlxuICAgICAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAgICAgKiBuZWVkcyB0byBiZSBzZXJpYWxpc2VkLCBvciBhIHNlcmlhbGlzZWQgcGlwZWxpbmUgbmVlZHMgdG8gYmUgbG9hZGVkLlxuICAgICAqXG4gICAgICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAgICAgKiBhZGRlZCB0byBpbnN0YW5jZXMgb2YgdGhlIHBpcGVsaW5lIGZvciB0aGVtIHRvIGJlIHVzZWQgd2hlbiBydW5uaW5nIGEgcGlwZWxpbmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCAtIFRoZSBsYWJlbCB0byByZWdpc3RlciB0aGlzIGZ1bmN0aW9uIHdpdGhcbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbihmbiwgbGFiZWwpIHtcbiAgICAgIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICAgICAgbHVuci51dGlscy53YXJuKFwiT3ZlcndyaXRpbmcgZXhpc3RpbmcgcmVnaXN0ZXJlZCBmdW5jdGlvbjogXCIgKyBsYWJlbCk7XG4gICAgICB9XG5cbiAgICAgIGZuLmxhYmVsID0gbGFiZWw7XG4gICAgICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm4ubGFiZWxdID0gZm47XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFdhcm5zIGlmIHRoZSBmdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCBhcyBhIFBpcGVsaW5lIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiBmbi5sYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnM7XG5cbiAgICAgIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgICAgIGx1bnIudXRpbHMud2FybihcbiAgICAgICAgICBcIkZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIHdpdGggcGlwZWxpbmUuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdoZW4gc2VyaWFsaXNpbmcgdGhlIGluZGV4LlxcblwiLFxuICAgICAgICAgIGZuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHBpcGVsaW5lLlxuICAgICAqXG4gICAgICogQWxsIGZ1bmN0aW9ucyB0byBiZSBsb2FkZWQgbXVzdCBhbHJlYWR5IGJlIHJlZ2lzdGVyZWQgd2l0aCBsdW5yLlBpcGVsaW5lLlxuICAgICAqIElmIGFueSBmdW5jdGlvbiBmcm9tIHRoZSBzZXJpYWxpc2VkIGRhdGEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhblxuICAgICAqIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWQgLSBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlBpcGVsaW5lfVxuICAgICAqL1xuICAgIGx1bnIuUGlwZWxpbmUubG9hZCA9IGZ1bmN0aW9uKHNlcmlhbGlzZWQpIHtcbiAgICAgIHZhciBwaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lKCk7XG5cbiAgICAgIHNlcmlhbGlzZWQuZm9yRWFjaChmdW5jdGlvbihmbk5hbWUpIHtcbiAgICAgICAgdmFyIGZuID0gbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuTmFtZV07XG5cbiAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgcGlwZWxpbmUuYWRkKGZuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbG9hZCB1bnJlZ2lzdGVyZWQgZnVuY3Rpb246IFwiICsgZm5OYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwaXBlbGluZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBuZXcgZnVuY3Rpb25zIHRvIHRoZSBlbmQgb2YgdGhlIHBpcGVsaW5lLlxuICAgICAqXG4gICAgICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb25bXX0gZnVuY3Rpb25zIC0gQW55IG51bWJlciBvZiBmdW5jdGlvbnMgdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmbnMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgICBmbnMuZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbik7XG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goZm4pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICAgICAqIHBpcGVsaW5lLlxuICAgICAqXG4gICAgICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGV4aXN0aW5nRm4gLSBBIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlIHBpcGVsaW5lLlxuICAgICAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBuZXdGbiAtIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5hZnRlciA9IGZ1bmN0aW9uKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gICAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbik7XG5cbiAgICAgIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pO1xuICAgICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBleGlzdGluZ0ZuXCIpO1xuICAgICAgfVxuXG4gICAgICBwb3MgPSBwb3MgKyAxO1xuICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMCwgbmV3Rm4pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgc2luZ2xlIGZ1bmN0aW9uIGJlZm9yZSBhIGZ1bmN0aW9uIHRoYXQgYWxyZWFkeSBleGlzdHMgaW4gdGhlXG4gICAgICogcGlwZWxpbmUuXG4gICAgICpcbiAgICAgKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZXhpc3RpbmdGbiAtIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gICAgICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IG5ld0ZuIC0gVGhlIG5ldyBmdW5jdGlvbiB0byBhZGQgdG8gdGhlIHBpcGVsaW5lLlxuICAgICAqL1xuICAgIGx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uKGV4aXN0aW5nRm4sIG5ld0ZuKSB7XG4gICAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbik7XG5cbiAgICAgIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGV4aXN0aW5nRm4pO1xuICAgICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBleGlzdGluZ0ZuXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAwLCBuZXdGbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcmVtb3ZlIGZyb20gdGhlIHBpcGVsaW5lLlxuICAgICAqL1xuICAgIGx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihmbik7XG4gICAgICBpZiAocG9zID09IC0xKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhY2suc3BsaWNlKHBvcywgMSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJ1bnMgdGhlIGN1cnJlbnQgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCBtYWtlIHVwIHRoZSBwaXBlbGluZSBhZ2FpbnN0IHRoZVxuICAgICAqIHBhc3NlZCB0b2tlbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbnMgVGhlIHRva2VucyB0byBydW4gdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKHRva2Vucykge1xuICAgICAgdmFyIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZuID0gdGhpcy5fc3RhY2tbaV07XG5cbiAgICAgICAgdG9rZW5zID0gdG9rZW5zLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0b2tlbiwgaikge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBmbih0b2tlbiwgaiwgdG9rZW5zKTtcblxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCB8fCByZXN1bHQgPT09IFwiXCIpIHJldHVybiBtZW1vO1xuXG4gICAgICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KHJlc3VsdCk7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRva2VucztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2UgbWV0aG9kIGZvciBwYXNzaW5nIGEgc3RyaW5nIHRocm91Z2ggYSBwaXBlbGluZSBhbmQgZ2V0dGluZ1xuICAgICAqIHN0cmluZ3Mgb3V0LiBUaGlzIG1ldGhvZCB0YWtlcyBjYXJlIG9mIHdyYXBwaW5nIHRoZSBwYXNzZWQgc3RyaW5nIGluIGFcbiAgICAgKiB0b2tlbiBhbmQgbWFwcGluZyB0aGUgcmVzdWx0aW5nIHRva2VucyBiYWNrIHRvIHN0cmluZ3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBwYXNzIHRocm91Z2ggdGhlIHBpcGVsaW5lLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5ydW5TdHJpbmcgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHZhciB0b2tlbiA9IG5ldyBsdW5yLlRva2VuKHN0cik7XG5cbiAgICAgIHJldHVybiB0aGlzLnJ1bihbdG9rZW5dKS5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyB0aGUgcGlwZWxpbmUgYnkgcmVtb3ZpbmcgYW55IGV4aXN0aW5nIHByb2Nlc3NvcnMuXG4gICAgICpcbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaXBlbGluZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAgICAgKlxuICAgICAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBsdW5yLlBpcGVsaW5lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGFjay5tYXAoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pO1xuXG4gICAgICAgIHJldHVybiBmbi5sYWJlbDtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgLyohXG4gKiBsdW5yLlZlY3RvclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbiAgICAvKipcbiAgICAgKiBBIHZlY3RvciBpcyB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgdmVjdG9yIHNwYWNlIG9mIGRvY3VtZW50cyBhbmQgcXVlcmllcy4gVGhlc2VcbiAgICAgKiB2ZWN0b3JzIHN1cHBvcnQgb3BlcmF0aW9ucyB0byBkZXRlcm1pbmUgdGhlIHNpbWlsYXJpdHkgYmV0d2VlbiB0d28gZG9jdW1lbnRzIG9yXG4gICAgICogYSBkb2N1bWVudCBhbmQgYSBxdWVyeS5cbiAgICAgKlxuICAgICAqIE5vcm1hbGx5IG5vIHBhcmFtZXRlcnMgYXJlIHJlcXVpcmVkIGZvciBpbml0aWFsaXppbmcgYSB2ZWN0b3IsIGJ1dCBpbiB0aGUgY2FzZSBvZlxuICAgICAqIGxvYWRpbmcgYSBwcmV2aW91c2x5IGR1bXBlZCB2ZWN0b3IgdGhlIHJhdyBlbGVtZW50cyBjYW4gYmUgcHJvdmlkZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgdmVjdG9ycyBhcmUgaW1wbGVtZW50ZWQgd2l0aCBhIGZsYXQgYXJyYXksIHdoZXJlIGFuIGVsZW1lbnRzXG4gICAgICogaW5kZXggaXMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgaXRzIHZhbHVlLiBFLmcuIFtpbmRleCwgdmFsdWUsIGluZGV4LCB2YWx1ZV0uIFRoaXNcbiAgICAgKiBhbGxvd3MgdGhlIHVuZGVybHlpbmcgYXJyYXkgdG8gYmUgYXMgc3BhcnNlIGFzIHBvc3NpYmxlIGFuZCBzdGlsbCBvZmZlciBkZWNlbnRcbiAgICAgKiBwZXJmb3JtYW5jZSB3aGVuIGJlaW5nIHVzZWQgZm9yIHZlY3RvciBjYWxjdWxhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge051bWJlcltdfSBbZWxlbWVudHNdIC0gVGhlIGZsYXQgbGlzdCBvZiBlbGVtZW50IGluZGV4IGFuZCBlbGVtZW50IHZhbHVlIHBhaXJzLlxuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yID0gZnVuY3Rpb24oZWxlbWVudHMpIHtcbiAgICAgIHRoaXMuX21hZ25pdHVkZSA9IDA7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHMgfHwgW107XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgdmVjdG9yIHRvIGluc2VydCBhIGdpdmVuIGluZGV4LlxuICAgICAqXG4gICAgICogVGhpcyBpcyB1c2VkIGludGVybmFsbHkgYnkgaW5zZXJ0IGFuZCB1cHNlcnQuIElmIHRoZXJlIGFyZSBkdXBsaWNhdGUgaW5kZXhlcyB0aGVuXG4gICAgICogdGhlIHBvc2l0aW9uIGlzIHJldHVybmVkIGFzIGlmIHRoZSB2YWx1ZSBmb3IgdGhhdCBpbmRleCB3ZXJlIHRvIGJlIHVwZGF0ZWQsIGJ1dCBpdFxuICAgICAqIGlzIHRoZSBjYWxsZXJzIHJlc3BvbnNpYmlsaXR5IHRvIGNoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYSBkdXBsaWNhdGUgYXQgdGhhdCBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBsdW5yLlZlY3Rvci5wcm90b3R5cGUucG9zaXRpb25Gb3JJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAvLyBGb3IgYW4gZW1wdHkgdmVjdG9yIHRoZSB0dXBsZSBjYW4gYmUgaW5zZXJ0ZWQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGFydCA9IDAsXG4gICAgICAgIGVuZCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoIC8gMixcbiAgICAgICAgc2xpY2VMZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgICAgcGl2b3RQb2ludCA9IE1hdGguZmxvb3Ioc2xpY2VMZW5ndGggLyAyKSxcbiAgICAgICAgcGl2b3RJbmRleCA9IHRoaXMuZWxlbWVudHNbcGl2b3RQb2ludCAqIDJdO1xuXG4gICAgICB3aGlsZSAoc2xpY2VMZW5ndGggPiAxKSB7XG4gICAgICAgIGlmIChwaXZvdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgICBzdGFydCA9IHBpdm90UG9pbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGl2b3RJbmRleCA+IGluZGV4KSB7XG4gICAgICAgICAgZW5kID0gcGl2b3RQb2ludDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwaXZvdEluZGV4ID09IGluZGV4KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzbGljZUxlbmd0aCA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICBwaXZvdFBvaW50ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNsaWNlTGVuZ3RoIC8gMik7XG4gICAgICAgIHBpdm90SW5kZXggPSB0aGlzLmVsZW1lbnRzW3Bpdm90UG9pbnQgKiAyXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBpdm90SW5kZXggPT0gaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBpdm90UG9pbnQgKiAyO1xuICAgICAgfVxuXG4gICAgICBpZiAocGl2b3RJbmRleCA+IGluZGV4KSB7XG4gICAgICAgIHJldHVybiBwaXZvdFBvaW50ICogMjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBpdm90SW5kZXggPCBpbmRleCkge1xuICAgICAgICByZXR1cm4gKHBpdm90UG9pbnQgKyAxKSAqIDI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYW4gZWxlbWVudCBhdCBhbiBpbmRleCB3aXRoaW4gdGhlIHZlY3Rvci5cbiAgICAgKlxuICAgICAqIERvZXMgbm90IGFsbG93IGR1cGxpY2F0ZXMsIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYWxyZWFkeSBhbiBlbnRyeVxuICAgICAqIGZvciB0aGlzIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbCAtIFRoZSB2YWx1ZSB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSB2ZWN0b3IuXG4gICAgICovXG4gICAgbHVuci5WZWN0b3IucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKGluc2VydElkeCwgdmFsKSB7XG4gICAgICB0aGlzLnVwc2VydChpbnNlcnRJZHgsIHZhbCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IFwiZHVwbGljYXRlIGluZGV4XCI7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBvciB1cGRhdGVzIGFuIGV4aXN0aW5nIGluZGV4IHdpdGhpbiB0aGUgdmVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbCAtIFRoZSB2YWx1ZSB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSB2ZWN0b3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGZvciB1cGRhdGVzLCB0aGUgZXhpc3RpbmcgdmFsdWUgYW5kIHRoZVxuICAgICAqIHJlcXVlc3RlZCB2YWx1ZSBhcmUgcGFzc2VkIGFzIGFyZ3VtZW50c1xuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yLnByb3RvdHlwZS51cHNlcnQgPSBmdW5jdGlvbihpbnNlcnRJZHgsIHZhbCwgZm4pIHtcbiAgICAgIHRoaXMuX21hZ25pdHVkZSA9IDA7XG4gICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uRm9ySW5kZXgoaW5zZXJ0SWR4KTtcblxuICAgICAgaWYgKHRoaXMuZWxlbWVudHNbcG9zaXRpb25dID09IGluc2VydElkeCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzW3Bvc2l0aW9uICsgMV0gPSBmbih0aGlzLmVsZW1lbnRzW3Bvc2l0aW9uICsgMV0sIHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnNwbGljZShwb3NpdGlvbiwgMCwgaW5zZXJ0SWR4LCB2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgb2YgdGhpcyB2ZWN0b3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGU7XG5cbiAgICAgIHZhciBzdW1PZlNxdWFyZXMgPSAwLFxuICAgICAgICBlbGVtZW50c0xlbmd0aCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGVsZW1lbnRzTGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuZWxlbWVudHNbaV07XG4gICAgICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAodGhpcy5fbWFnbml0dWRlID0gTWF0aC5zcXJ0KHN1bU9mU3F1YXJlcykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciB2ZWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciAtIFRoZSB2ZWN0b3IgdG8gY29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgd2l0aC5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbihvdGhlclZlY3Rvcikge1xuICAgICAgdmFyIGRvdFByb2R1Y3QgPSAwLFxuICAgICAgICBhID0gdGhpcy5lbGVtZW50cyxcbiAgICAgICAgYiA9IG90aGVyVmVjdG9yLmVsZW1lbnRzLFxuICAgICAgICBhTGVuID0gYS5sZW5ndGgsXG4gICAgICAgIGJMZW4gPSBiLmxlbmd0aCxcbiAgICAgICAgYVZhbCA9IDAsXG4gICAgICAgIGJWYWwgPSAwLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgaiA9IDA7XG5cbiAgICAgIHdoaWxlIChpIDwgYUxlbiAmJiBqIDwgYkxlbikge1xuICAgICAgICAoYVZhbCA9IGFbaV0pLCAoYlZhbCA9IGJbal0pO1xuICAgICAgICBpZiAoYVZhbCA8IGJWYWwpIHtcbiAgICAgICAgICBpICs9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA+IGJWYWwpIHtcbiAgICAgICAgICBqICs9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoYVZhbCA9PSBiVmFsKSB7XG4gICAgICAgICAgZG90UHJvZHVjdCArPSBhW2kgKyAxXSAqIGJbaiArIDFdO1xuICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICBqICs9IDI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRvdFByb2R1Y3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGNvc2luZSBzaW1pbGFyaXR5IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAgICAgKiB2ZWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciAtIFRoZSBvdGhlciB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZVxuICAgICAqIHNpbWlsYXJpdHkgd2l0aC5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yLnByb3RvdHlwZS5zaW1pbGFyaXR5ID0gZnVuY3Rpb24ob3RoZXJWZWN0b3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuZG90KG90aGVyVmVjdG9yKSAvICh0aGlzLm1hZ25pdHVkZSgpICogb3RoZXJWZWN0b3IubWFnbml0dWRlKCkpXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgdmVjdG9yIHRvIGFuIGFycmF5IG9mIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHZlY3Rvci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAgICAgKi9cbiAgICBsdW5yLlZlY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG91dHB1dCA9IG5ldyBBcnJheSh0aGlzLmVsZW1lbnRzLmxlbmd0aCAvIDIpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMSwgaiA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSArPSAyLCBqKyspIHtcbiAgICAgICAgb3V0cHV0W2pdID0gdGhpcy5lbGVtZW50c1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQSBKU09OIHNlcmlhbGl6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcltdfVxuICAgICAqL1xuICAgIGx1bnIuVmVjdG9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xuICAgIH07XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAvKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuICAgIC8qKlxuICAgICAqIGx1bnIuc3RlbW1lciBpcyBhbiBlbmdsaXNoIGxhbmd1YWdlIHN0ZW1tZXIsIHRoaXMgaXMgYSBKYXZhU2NyaXB0XG4gICAgICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAaW1wbGVtZW50cyB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufVxuICAgICAqIEBwYXJhbSB7bHVuci5Ub2tlbn0gdG9rZW4gLSBUaGUgc3RyaW5nIHRvIHN0ZW1cbiAgICAgKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAgICAgKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICAgICAqL1xuICAgIGx1bnIuc3RlbW1lciA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGVwMmxpc3QgPSB7XG4gICAgICAgICAgYXRpb25hbDogXCJhdGVcIixcbiAgICAgICAgICB0aW9uYWw6IFwidGlvblwiLFxuICAgICAgICAgIGVuY2k6IFwiZW5jZVwiLFxuICAgICAgICAgIGFuY2k6IFwiYW5jZVwiLFxuICAgICAgICAgIGl6ZXI6IFwiaXplXCIsXG4gICAgICAgICAgYmxpOiBcImJsZVwiLFxuICAgICAgICAgIGFsbGk6IFwiYWxcIixcbiAgICAgICAgICBlbnRsaTogXCJlbnRcIixcbiAgICAgICAgICBlbGk6IFwiZVwiLFxuICAgICAgICAgIG91c2xpOiBcIm91c1wiLFxuICAgICAgICAgIGl6YXRpb246IFwiaXplXCIsXG4gICAgICAgICAgYXRpb246IFwiYXRlXCIsXG4gICAgICAgICAgYXRvcjogXCJhdGVcIixcbiAgICAgICAgICBhbGlzbTogXCJhbFwiLFxuICAgICAgICAgIGl2ZW5lc3M6IFwiaXZlXCIsXG4gICAgICAgICAgZnVsbmVzczogXCJmdWxcIixcbiAgICAgICAgICBvdXNuZXNzOiBcIm91c1wiLFxuICAgICAgICAgIGFsaXRpOiBcImFsXCIsXG4gICAgICAgICAgaXZpdGk6IFwiaXZlXCIsXG4gICAgICAgICAgYmlsaXRpOiBcImJsZVwiLFxuICAgICAgICAgIGxvZ2k6IFwibG9nXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcDNsaXN0ID0ge1xuICAgICAgICAgIGljYXRlOiBcImljXCIsXG4gICAgICAgICAgYXRpdmU6IFwiXCIsXG4gICAgICAgICAgYWxpemU6IFwiYWxcIixcbiAgICAgICAgICBpY2l0aTogXCJpY1wiLFxuICAgICAgICAgIGljYWw6IFwiaWNcIixcbiAgICAgICAgICBmdWw6IFwiXCIsXG4gICAgICAgICAgbmVzczogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBjID0gXCJbXmFlaW91XVwiLCAvLyBjb25zb25hbnRcbiAgICAgICAgdiA9IFwiW2FlaW91eV1cIiwgLy8gdm93ZWxcbiAgICAgICAgQyA9IGMgKyBcIlteYWVpb3V5XSpcIiwgLy8gY29uc29uYW50IHNlcXVlbmNlXG4gICAgICAgIFYgPSB2ICsgXCJbYWVpb3VdKlwiLCAvLyB2b3dlbCBzZXF1ZW5jZVxuICAgICAgICBtZ3IwID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDLCAvLyBbQ11WQy4uLiBpcyBtPjBcbiAgICAgICAgbWVxMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFwiKFwiICsgViArIFwiKT8kXCIsIC8vIFtDXVZDW1ZdIGlzIG09MVxuICAgICAgICBtZ3IxID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgViArIEMsIC8vIFtDXVZDVkMuLi4gaXMgbT4xXG4gICAgICAgIHNfdiA9IFwiXihcIiArIEMgKyBcIik/XCIgKyB2OyAvLyB2b3dlbCBpbiBzdGVtXG5cbiAgICAgIHZhciByZV9tZ3IwID0gbmV3IFJlZ0V4cChtZ3IwKTtcbiAgICAgIHZhciByZV9tZ3IxID0gbmV3IFJlZ0V4cChtZ3IxKTtcbiAgICAgIHZhciByZV9tZXExID0gbmV3IFJlZ0V4cChtZXExKTtcbiAgICAgIHZhciByZV9zX3YgPSBuZXcgUmVnRXhwKHNfdik7XG5cbiAgICAgIHZhciByZV8xYSA9IC9eKC4rPykoc3N8aSllcyQvO1xuICAgICAgdmFyIHJlMl8xYSA9IC9eKC4rPykoW15zXSlzJC87XG4gICAgICB2YXIgcmVfMWIgPSAvXiguKz8pZWVkJC87XG4gICAgICB2YXIgcmUyXzFiID0gL14oLis/KShlZHxpbmcpJC87XG4gICAgICB2YXIgcmVfMWJfMiA9IC8uJC87XG4gICAgICB2YXIgcmUyXzFiXzIgPSAvKGF0fGJsfGl6KSQvO1xuICAgICAgdmFyIHJlM18xYl8yID0gbmV3IFJlZ0V4cChcIihbXmFlaW91eWxzel0pXFxcXDEkXCIpO1xuICAgICAgdmFyIHJlNF8xYl8yID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgICAgIHZhciByZV8xYyA9IC9eKC4rP1teYWVpb3VdKXkkLztcbiAgICAgIHZhciByZV8yID0gL14oLis/KShhdGlvbmFsfHRpb25hbHxlbmNpfGFuY2l8aXplcnxibGl8YWxsaXxlbnRsaXxlbGl8b3VzbGl8aXphdGlvbnxhdGlvbnxhdG9yfGFsaXNtfGl2ZW5lc3N8ZnVsbmVzc3xvdXNuZXNzfGFsaXRpfGl2aXRpfGJpbGl0aXxsb2dpKSQvO1xuXG4gICAgICB2YXIgcmVfMyA9IC9eKC4rPykoaWNhdGV8YXRpdmV8YWxpemV8aWNpdGl8aWNhbHxmdWx8bmVzcykkLztcblxuICAgICAgdmFyIHJlXzQgPSAvXiguKz8pKGFsfGFuY2V8ZW5jZXxlcnxpY3xhYmxlfGlibGV8YW50fGVtZW50fG1lbnR8ZW50fG91fGlzbXxhdGV8aXRpfG91c3xpdmV8aXplKSQvO1xuICAgICAgdmFyIHJlMl80ID0gL14oLis/KShzfHQpKGlvbikkLztcblxuICAgICAgdmFyIHJlXzUgPSAvXiguKz8pZSQvO1xuICAgICAgdmFyIHJlXzVfMSA9IC9sbCQvO1xuICAgICAgdmFyIHJlM181ID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgICAgIHZhciBwb3J0ZXJTdGVtbWVyID0gZnVuY3Rpb24gcG9ydGVyU3RlbW1lcih3KSB7XG4gICAgICAgIHZhciBzdGVtLCBzdWZmaXgsIGZpcnN0Y2gsIHJlLCByZTIsIHJlMywgcmU0O1xuXG4gICAgICAgIGlmICh3Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICByZXR1cm4gdztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLCAxKTtcbiAgICAgICAgaWYgKGZpcnN0Y2ggPT0gXCJ5XCIpIHtcbiAgICAgICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGVwIDFhXG4gICAgICAgIHJlID0gcmVfMWE7XG4gICAgICAgIHJlMiA9IHJlMl8xYTtcblxuICAgICAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgICAgIHcgPSB3LnJlcGxhY2UocmUsIFwiJDEkMlwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgICAgIHcgPSB3LnJlcGxhY2UocmUyLCBcIiQxJDJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdGVwIDFiXG4gICAgICAgIHJlID0gcmVfMWI7XG4gICAgICAgIHJlMiA9IHJlMl8xYjtcbiAgICAgICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgICAgICBpZiAocmUudGVzdChmcFsxXSkpIHtcbiAgICAgICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgICAgIHcgPSB3LnJlcGxhY2UocmUsIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgICAgIHZhciBmcCA9IHJlMi5leGVjKHcpO1xuICAgICAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgICAgICByZTIgPSByZV9zX3Y7XG4gICAgICAgICAgaWYgKHJlMi50ZXN0KHN0ZW0pKSB7XG4gICAgICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgICAgIHJlMiA9IHJlMl8xYl8yO1xuICAgICAgICAgICAgcmUzID0gcmUzXzFiXzI7XG4gICAgICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgICAgIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgICAgICAgICB3ID0gdyArIFwiZVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZTMudGVzdCh3KSkge1xuICAgICAgICAgICAgICByZSA9IHJlXzFiXzI7XG4gICAgICAgICAgICAgIHcgPSB3LnJlcGxhY2UocmUsIFwiXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZTQudGVzdCh3KSkge1xuICAgICAgICAgICAgICB3ID0gdyArIFwiZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgMWMgLSByZXBsYWNlIHN1ZmZpeCB5IG9yIFkgYnkgaSBpZiBwcmVjZWRlZCBieSBhIG5vbi12b3dlbCB3aGljaCBpcyBub3QgdGhlIGZpcnN0IGxldHRlciBvZiB0aGUgd29yZCAoc28gY3J5IC0+IGNyaSwgYnkgLT4gYnksIHNheSAtPiBzYXkpXG4gICAgICAgIHJlID0gcmVfMWM7XG4gICAgICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgICAgICBzdGVtID0gZnBbMV07XG4gICAgICAgICAgdyA9IHN0ZW0gKyBcImlcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgMlxuICAgICAgICByZSA9IHJlXzI7XG4gICAgICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgICAgICBzdGVtID0gZnBbMV07XG4gICAgICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgICAgICB3ID0gc3RlbSArIHN0ZXAybGlzdFtzdWZmaXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgM1xuICAgICAgICByZSA9IHJlXzM7XG4gICAgICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgICAgICBzdGVtID0gZnBbMV07XG4gICAgICAgICAgc3VmZml4ID0gZnBbMl07XG4gICAgICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgICAgICB3ID0gc3RlbSArIHN0ZXAzbGlzdFtzdWZmaXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgNFxuICAgICAgICByZSA9IHJlXzQ7XG4gICAgICAgIHJlMiA9IHJlMl80O1xuICAgICAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgICAgIHJlID0gcmVfbWdyMTtcbiAgICAgICAgICBpZiAocmUudGVzdChzdGVtKSkge1xuICAgICAgICAgICAgdyA9IHN0ZW07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICAgICAgc3RlbSA9IGZwWzFdICsgZnBbMl07XG4gICAgICAgICAgcmUyID0gcmVfbWdyMTtcbiAgICAgICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgICAgIHcgPSBzdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0ZXAgNVxuICAgICAgICByZSA9IHJlXzU7XG4gICAgICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgICAgICBzdGVtID0gZnBbMV07XG4gICAgICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgICAgIHJlMiA9IHJlX21lcTE7XG4gICAgICAgICAgcmUzID0gcmUzXzU7XG4gICAgICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkgfHwgKHJlMi50ZXN0KHN0ZW0pICYmICFyZTMudGVzdChzdGVtKSkpIHtcbiAgICAgICAgICAgIHcgPSBzdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlID0gcmVfNV8xO1xuICAgICAgICByZTIgPSByZV9tZ3IxO1xuICAgICAgICBpZiAocmUudGVzdCh3KSAmJiByZTIudGVzdCh3KSkge1xuICAgICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgICB3ID0gdy5yZXBsYWNlKHJlLCBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFuZCB0dXJuIGluaXRpYWwgWSBiYWNrIHRvIHlcblxuICAgICAgICBpZiAoZmlyc3RjaCA9PSBcInlcIikge1xuICAgICAgICAgIHcgPSBmaXJzdGNoLnRvTG93ZXJDYXNlKCkgKyB3LnN1YnN0cigxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi51cGRhdGUocG9ydGVyU3RlbW1lcik7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdGVtbWVyLCBcInN0ZW1tZXJcIik7XG4gICAgLyohXG4gKiBsdW5yLnN0b3BXb3JkRmlsdGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuICAgIC8qKlxuICAgICAqIGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciBidWlsZHMgYSBzdG9wV29yZEZpbHRlciBmdW5jdGlvbiBmcm9tIHRoZSBwcm92aWRlZFxuICAgICAqIGxpc3Qgb2Ygc3RvcCB3b3Jkcy5cbiAgICAgKlxuICAgICAqIFRoZSBidWlsdCBpbiBsdW5yLnN0b3BXb3JkRmlsdGVyIGlzIGJ1aWx0IHVzaW5nIHRoaXMgZ2VuZXJhdG9yIGFuZCBjYW4gYmUgdXNlZFxuICAgICAqIHRvIGdlbmVyYXRlIGN1c3RvbSBzdG9wV29yZEZpbHRlcnMgZm9yIGFwcGxpY2F0aW9ucyBvciBub24gRW5nbGlzaCBsYW5ndWFnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0b2tlbiBUaGUgdG9rZW4gdG8gcGFzcyB0aHJvdWdoIHRoZSBmaWx0ZXJcbiAgICAgKiBAcmV0dXJucyB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufVxuICAgICAqIEBzZWUgbHVuci5QaXBlbGluZVxuICAgICAqIEBzZWUgbHVuci5zdG9wV29yZEZpbHRlclxuICAgICAqL1xuICAgIGx1bnIuZ2VuZXJhdGVTdG9wV29yZEZpbHRlciA9IGZ1bmN0aW9uKHN0b3BXb3Jkcykge1xuICAgICAgdmFyIHdvcmRzID0gc3RvcFdvcmRzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBzdG9wV29yZCkge1xuICAgICAgICBtZW1vW3N0b3BXb3JkXSA9IHN0b3BXb3JkO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgIH0sIHt9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbiAmJiB3b3Jkc1t0b2tlbi50b1N0cmluZygpXSAhPT0gdG9rZW4udG9TdHJpbmcoKSkgcmV0dXJuIHRva2VuO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogbHVuci5zdG9wV29yZEZpbHRlciBpcyBhbiBFbmdsaXNoIGxhbmd1YWdlIHN0b3Agd29yZCBsaXN0IGZpbHRlciwgYW55IHdvcmRzXG4gICAgICogY29udGFpbmVkIGluIHRoZSBsaXN0IHdpbGwgbm90IGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBmaWx0ZXIuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgaW4gdGhlIFBpcGVsaW5lLiBJZiB0aGUgdG9rZW4gZG9lcyBub3QgcGFzcyB0aGVcbiAgICAgKiBmaWx0ZXIgdGhlbiB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gICAgICogQHBhcmFtcyB7bHVuci5Ub2tlbn0gdG9rZW4gLSBBIHRva2VuIHRvIGNoZWNrIGZvciBiZWluZyBhIHN0b3Agd29yZC5cbiAgICAgKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAgICAgKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICAgICAqL1xuICAgIGx1bnIuc3RvcFdvcmRGaWx0ZXIgPSBsdW5yLmdlbmVyYXRlU3RvcFdvcmRGaWx0ZXIoW1xuICAgICAgXCJhXCIsXG4gICAgICBcImFibGVcIixcbiAgICAgIFwiYWJvdXRcIixcbiAgICAgIFwiYWNyb3NzXCIsXG4gICAgICBcImFmdGVyXCIsXG4gICAgICBcImFsbFwiLFxuICAgICAgXCJhbG1vc3RcIixcbiAgICAgIFwiYWxzb1wiLFxuICAgICAgXCJhbVwiLFxuICAgICAgXCJhbW9uZ1wiLFxuICAgICAgXCJhblwiLFxuICAgICAgXCJhbmRcIixcbiAgICAgIFwiYW55XCIsXG4gICAgICBcImFyZVwiLFxuICAgICAgXCJhc1wiLFxuICAgICAgXCJhdFwiLFxuICAgICAgXCJiZVwiLFxuICAgICAgXCJiZWNhdXNlXCIsXG4gICAgICBcImJlZW5cIixcbiAgICAgIFwiYnV0XCIsXG4gICAgICBcImJ5XCIsXG4gICAgICBcImNhblwiLFxuICAgICAgXCJjYW5ub3RcIixcbiAgICAgIFwiY291bGRcIixcbiAgICAgIFwiZGVhclwiLFxuICAgICAgXCJkaWRcIixcbiAgICAgIFwiZG9cIixcbiAgICAgIFwiZG9lc1wiLFxuICAgICAgXCJlaXRoZXJcIixcbiAgICAgIFwiZWxzZVwiLFxuICAgICAgXCJldmVyXCIsXG4gICAgICBcImV2ZXJ5XCIsXG4gICAgICBcImZvclwiLFxuICAgICAgXCJmcm9tXCIsXG4gICAgICBcImdldFwiLFxuICAgICAgXCJnb3RcIixcbiAgICAgIFwiaGFkXCIsXG4gICAgICBcImhhc1wiLFxuICAgICAgXCJoYXZlXCIsXG4gICAgICBcImhlXCIsXG4gICAgICBcImhlclwiLFxuICAgICAgXCJoZXJzXCIsXG4gICAgICBcImhpbVwiLFxuICAgICAgXCJoaXNcIixcbiAgICAgIFwiaG93XCIsXG4gICAgICBcImhvd2V2ZXJcIixcbiAgICAgIFwiaVwiLFxuICAgICAgXCJpZlwiLFxuICAgICAgXCJpblwiLFxuICAgICAgXCJpbnRvXCIsXG4gICAgICBcImlzXCIsXG4gICAgICBcIml0XCIsXG4gICAgICBcIml0c1wiLFxuICAgICAgXCJqdXN0XCIsXG4gICAgICBcImxlYXN0XCIsXG4gICAgICBcImxldFwiLFxuICAgICAgXCJsaWtlXCIsXG4gICAgICBcImxpa2VseVwiLFxuICAgICAgXCJtYXlcIixcbiAgICAgIFwibWVcIixcbiAgICAgIFwibWlnaHRcIixcbiAgICAgIFwibW9zdFwiLFxuICAgICAgXCJtdXN0XCIsXG4gICAgICBcIm15XCIsXG4gICAgICBcIm5laXRoZXJcIixcbiAgICAgIFwibm9cIixcbiAgICAgIFwibm9yXCIsXG4gICAgICBcIm5vdFwiLFxuICAgICAgXCJvZlwiLFxuICAgICAgXCJvZmZcIixcbiAgICAgIFwib2Z0ZW5cIixcbiAgICAgIFwib25cIixcbiAgICAgIFwib25seVwiLFxuICAgICAgXCJvclwiLFxuICAgICAgXCJvdGhlclwiLFxuICAgICAgXCJvdXJcIixcbiAgICAgIFwib3duXCIsXG4gICAgICBcInJhdGhlclwiLFxuICAgICAgXCJzYWlkXCIsXG4gICAgICBcInNheVwiLFxuICAgICAgXCJzYXlzXCIsXG4gICAgICBcInNoZVwiLFxuICAgICAgXCJzaG91bGRcIixcbiAgICAgIFwic2luY2VcIixcbiAgICAgIFwic29cIixcbiAgICAgIFwic29tZVwiLFxuICAgICAgXCJ0aGFuXCIsXG4gICAgICBcInRoYXRcIixcbiAgICAgIFwidGhlXCIsXG4gICAgICBcInRoZWlyXCIsXG4gICAgICBcInRoZW1cIixcbiAgICAgIFwidGhlblwiLFxuICAgICAgXCJ0aGVyZVwiLFxuICAgICAgXCJ0aGVzZVwiLFxuICAgICAgXCJ0aGV5XCIsXG4gICAgICBcInRoaXNcIixcbiAgICAgIFwidGlzXCIsXG4gICAgICBcInRvXCIsXG4gICAgICBcInRvb1wiLFxuICAgICAgXCJ0d2FzXCIsXG4gICAgICBcInVzXCIsXG4gICAgICBcIndhbnRzXCIsXG4gICAgICBcIndhc1wiLFxuICAgICAgXCJ3ZVwiLFxuICAgICAgXCJ3ZXJlXCIsXG4gICAgICBcIndoYXRcIixcbiAgICAgIFwid2hlblwiLFxuICAgICAgXCJ3aGVyZVwiLFxuICAgICAgXCJ3aGljaFwiLFxuICAgICAgXCJ3aGlsZVwiLFxuICAgICAgXCJ3aG9cIixcbiAgICAgIFwid2hvbVwiLFxuICAgICAgXCJ3aHlcIixcbiAgICAgIFwid2lsbFwiLFxuICAgICAgXCJ3aXRoXCIsXG4gICAgICBcIndvdWxkXCIsXG4gICAgICBcInlldFwiLFxuICAgICAgXCJ5b3VcIixcbiAgICAgIFwieW91clwiXG4gICAgXSk7XG5cbiAgICBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci5zdG9wV29yZEZpbHRlciwgXCJzdG9wV29yZEZpbHRlclwiKTtcbiAgICAvKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDE3IE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbiAgICAvKipcbiAgICAgKiBsdW5yLnRyaW1tZXIgaXMgYSBwaXBlbGluZSBmdW5jdGlvbiBmb3IgdHJpbW1pbmcgbm9uIHdvcmRcbiAgICAgKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICAgICAqIGVudGVyIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gICAgICogY2hhcmFjdGVycyBhbmQgc2hvdWxkIGVpdGhlciBiZSByZW1vdmVkIG9yIGFkYXB0ZWQgZm9yIHVzZVxuICAgICAqIHdpdGggbGFuZ3VhZ2VzIHdpdGggbm9uLWxhdGluIGNoYXJhY3RlcnMuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGltcGxlbWVudHMge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn1cbiAgICAgKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICAgICAqIEByZXR1cm5zIHtsdW5yLlRva2VufVxuICAgICAqIEBzZWUgbHVuci5QaXBlbGluZVxuICAgICAqL1xuICAgIGx1bnIudHJpbW1lciA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICByZXR1cm4gdG9rZW4udXBkYXRlKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvXlxcVysvLCBcIlwiKS5yZXBsYWNlKC9cXFcrJC8sIFwiXCIpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnRyaW1tZXIsIFwidHJpbW1lclwiKTtcbiAgICAvKiFcbiAqIGx1bnIuVG9rZW5TZXRcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4gICAgLyoqXG4gICAgICogQSB0b2tlbiBzZXQgaXMgdXNlZCB0byBzdG9yZSB0aGUgdW5pcXVlIGxpc3Qgb2YgYWxsIHRva2Vuc1xuICAgICAqIHdpdGhpbiBhbiBpbmRleC4gVG9rZW4gc2V0cyBhcmUgYWxzbyB1c2VkIHRvIHJlcHJlc2VudCBhblxuICAgICAqIGluY29taW5nIHF1ZXJ5IHRvIHRoZSBpbmRleCwgdGhpcyBxdWVyeSB0b2tlbiBzZXQgYW5kIGluZGV4XG4gICAgICogdG9rZW4gc2V0IGFyZSB0aGVuIGludGVyc2VjdGVkIHRvIGZpbmQgd2hpY2ggdG9rZW5zIHRvIGxvb2tcbiAgICAgKiB1cCBpbiB0aGUgaW52ZXJ0ZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBBIHRva2VuIHNldCBjYW4gaG9sZCBtdWx0aXBsZSB0b2tlbnMsIGFzIGluIHRoZSBjYXNlIG9mIHRoZVxuICAgICAqIGluZGV4IHRva2VuIHNldCwgb3IgaXQgY2FuIGhvbGQgYSBzaW5nbGUgdG9rZW4gYXMgaW4gdGhlXG4gICAgICogY2FzZSBvZiBhIHNpbXBsZSBxdWVyeSB0b2tlbiBzZXQuXG4gICAgICpcbiAgICAgKiBBZGRpdGlvbmFsbHkgdG9rZW4gc2V0cyBhcmUgdXNlZCB0byBwZXJmb3JtIHdpbGRjYXJkIG1hdGNoaW5nLlxuICAgICAqIExlYWRpbmcsIGNvbnRhaW5lZCBhbmQgdHJhaWxpbmcgd2lsZGNhcmRzIGFyZSBzdXBwb3J0ZWQsIGFuZFxuICAgICAqIGZyb20gdGhpcyBlZGl0IGRpc3RhbmNlIG1hdGNoaW5nIGNhbiBhbHNvIGJlIHByb3ZpZGVkLlxuICAgICAqXG4gICAgICogVG9rZW4gc2V0cyBhcmUgaW1wbGVtZW50ZWQgYXMgYSBtaW5pbWFsIGZpbml0ZSBzdGF0ZSBhdXRvbWF0YSxcbiAgICAgKiB3aGVyZSBib3RoIGNvbW1vbiBwcmVmaXhlcyBhbmQgc3VmZml4ZXMgYXJlIHNoYXJlZCBiZXR3ZWVuIHRva2Vucy5cbiAgICAgKiBUaGlzIGhlbHBzIHRvIHJlZHVjZSB0aGUgc3BhY2UgdXNlZCBmb3Igc3RvcmluZyB0aGUgdG9rZW4gc2V0LlxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgbHVuci5Ub2tlblNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5maW5hbCA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGdlcyA9IHt9O1xuICAgICAgdGhpcy5pZCA9IGx1bnIuVG9rZW5TZXQuX25leHRJZDtcbiAgICAgIGx1bnIuVG9rZW5TZXQuX25leHRJZCArPSAxO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgbmV4dCwgYXV0byBpbmNyZW1lbnQsIGlkZW50aWZpZXIgdG8gYXNzaWduXG4gICAgICogdG8gYSBuZXcgdG9rZW5TZXQuXG4gICAgICpcbiAgICAgKiBUb2tlblNldHMgcmVxdWlyZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHRvIGJlIGNvcnJlY3RseSBtaW5pbWlzZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGx1bnIuVG9rZW5TZXQuX25leHRJZCA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVG9rZW5TZXQgaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gc29ydGVkIGFycmF5IG9mIHdvcmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gYXJyIC0gQSBzb3J0ZWQgYXJyYXkgb2Ygc3RyaW5ncyB0byBjcmVhdGUgdGhlIHNldCBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICAgICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgaW5wdXQgYXJyYXkgaXMgbm90IHNvcnRlZC5cbiAgICAgKi9cbiAgICBsdW5yLlRva2VuU2V0LmZyb21BcnJheSA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgdmFyIGJ1aWxkZXIgPSBuZXcgbHVuci5Ub2tlblNldC5CdWlsZGVyKCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYnVpbGRlci5pbnNlcnQoYXJyW2ldKTtcbiAgICAgIH1cblxuICAgICAgYnVpbGRlci5maW5pc2goKTtcbiAgICAgIHJldHVybiBidWlsZGVyLnJvb3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0b2tlbiBzZXQgZnJvbSBhIHF1ZXJ5IGNsYXVzZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNsYXVzZSAtIEEgc2luZ2xlIGNsYXVzZSBmcm9tIGx1bnIuUXVlcnkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXVzZS50ZXJtIC0gVGhlIHF1ZXJ5IGNsYXVzZSB0ZXJtLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY2xhdXNlLmVkaXREaXN0YW5jZV0gLSBUaGUgb3B0aW9uYWwgZWRpdCBkaXN0YW5jZSBmb3IgdGhlIHRlcm0uXG4gICAgICogQHJldHVybnMge2x1bnIuVG9rZW5TZXR9XG4gICAgICovXG4gICAgbHVuci5Ub2tlblNldC5mcm9tQ2xhdXNlID0gZnVuY3Rpb24oY2xhdXNlKSB7XG4gICAgICBpZiAoXCJlZGl0RGlzdGFuY2VcIiBpbiBjbGF1c2UpIHtcbiAgICAgICAgcmV0dXJuIGx1bnIuVG9rZW5TZXQuZnJvbUZ1enp5U3RyaW5nKGNsYXVzZS50ZXJtLCBjbGF1c2UuZWRpdERpc3RhbmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsdW5yLlRva2VuU2V0LmZyb21TdHJpbmcoY2xhdXNlLnRlcm0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdG9rZW4gc2V0IHJlcHJlc2VudGluZyBhIHNpbmdsZSBzdHJpbmcgd2l0aCBhIHNwZWNpZmllZFxuICAgICAqIGVkaXQgZGlzdGFuY2UuXG4gICAgICpcbiAgICAgKiBJbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMgYW5kIHRyYW5zcG9zaXRpb25zIGFyZSBlYWNoXG4gICAgICogdHJlYXRlZCBhcyBhbiBlZGl0IGRpc3RhbmNlIG9mIDEuXG4gICAgICpcbiAgICAgKiBJbmNyZWFzaW5nIHRoZSBhbGxvd2VkIGVkaXQgZGlzdGFuY2Ugd2lsbCBoYXZlIGEgZHJhbWF0aWMgaW1wYWN0XG4gICAgICogb24gdGhlIHBlcmZvcm1hbmNlIG9mIGJvdGggY3JlYXRpbmcgYW5kIGludGVyc2VjdGluZyB0aGVzZSBUb2tlblNldHMuXG4gICAgICogSXQgaXMgYWR2aXNlZCB0byBrZWVwIHRoZSBlZGl0IGRpc3RhbmNlIGxlc3MgdGhhbiAzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gY3JlYXRlIHRoZSB0b2tlbiBzZXQgZnJvbS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZWRpdERpc3RhbmNlIC0gVGhlIGFsbG93ZWQgZWRpdCBkaXN0YW5jZSB0byBtYXRjaC5cbiAgICAgKiBAcmV0dXJucyB7bHVuci5WZWN0b3J9XG4gICAgICovXG4gICAgbHVuci5Ub2tlblNldC5mcm9tRnV6enlTdHJpbmcgPSBmdW5jdGlvbihzdHIsIGVkaXREaXN0YW5jZSkge1xuICAgICAgdmFyIHJvb3QgPSBuZXcgbHVuci5Ub2tlblNldCgpO1xuXG4gICAgICB2YXIgc3RhY2sgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBub2RlOiByb290LFxuICAgICAgICAgIGVkaXRzUmVtYWluaW5nOiBlZGl0RGlzdGFuY2UsXG4gICAgICAgICAgc3RyOiBzdHJcbiAgICAgICAgfVxuICAgICAgXTtcblxuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKTtcblxuICAgICAgICAvLyBubyBlZGl0XG4gICAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBjaGFyID0gZnJhbWUuc3RyLmNoYXJBdCgwKSxcbiAgICAgICAgICAgIG5vRWRpdE5vZGU7XG5cbiAgICAgICAgICBpZiAoY2hhciBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgICAgICBub0VkaXROb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9FZGl0Tm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0KCk7XG4gICAgICAgICAgICBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJdID0gbm9FZGl0Tm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBub0VkaXROb2RlLmZpbmFsID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgIG5vZGU6IG5vRWRpdE5vZGUsXG4gICAgICAgICAgICAgIGVkaXRzUmVtYWluaW5nOiBmcmFtZS5lZGl0c1JlbWFpbmluZyxcbiAgICAgICAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0aW9uXG4gICAgICAgIC8vIGNhbiBvbmx5IGRvIGEgZGVsZXRpb24gaWYgd2UgaGF2ZSBlbm91Z2ggZWRpdHMgcmVtYWluaW5nXG4gICAgICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgY2hhcmFjdGVycyBsZWZ0IHRvIGRlbGV0ZSBpbiB0aGUgc3RyaW5nXG4gICAgICAgIGlmIChmcmFtZS5lZGl0c1JlbWFpbmluZyA+IDAgJiYgZnJhbWUuc3RyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB2YXIgY2hhciA9IGZyYW1lLnN0ci5jaGFyQXQoMSksXG4gICAgICAgICAgICBkZWxldGlvbk5vZGU7XG5cbiAgICAgICAgICBpZiAoY2hhciBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgICAgICBkZWxldGlvbk5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGlvbk5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCgpO1xuICAgICAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tjaGFyXSA9IGRlbGV0aW9uTm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA8PSAyKSB7XG4gICAgICAgICAgICBkZWxldGlvbk5vZGUuZmluYWwgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICAgICAgbm9kZTogZGVsZXRpb25Ob2RlLFxuICAgICAgICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgICAgICAgICBzdHI6IGZyYW1lLnN0ci5zbGljZSgyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRpb25cbiAgICAgICAgLy8ganVzdCByZW1vdmluZyB0aGUgbGFzdCBjaGFyYWN0ZXIgZnJvbSB0aGUgc3RyXG4gICAgICAgIGlmIChmcmFtZS5lZGl0c1JlbWFpbmluZyA+IDAgJiYgZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgZnJhbWUubm9kZS5maW5hbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdWJzdGl0dXRpb25cbiAgICAgICAgLy8gY2FuIG9ubHkgZG8gYSBzdWJzdGl0dXRpb24gaWYgd2UgaGF2ZSBlbm91Z2ggZWRpdHMgcmVtYWluaW5nXG4gICAgICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgY2hhcmFjdGVycyBsZWZ0IHRvIHN1YnN0aXR1dGVcbiAgICAgICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID4gMCAmJiBmcmFtZS5zdHIubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICBpZiAoXCIqXCIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICAgICAgdmFyIHN1YnN0aXR1dGlvbk5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW1wiKlwiXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN1YnN0aXR1dGlvbk5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCgpO1xuICAgICAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tcIipcIl0gPSBzdWJzdGl0dXRpb25Ob2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHN1YnN0aXR1dGlvbk5vZGUuZmluYWwgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICAgICAgbm9kZTogc3Vic3RpdHV0aW9uTm9kZSxcbiAgICAgICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluc2VydGlvblxuICAgICAgICAvLyBjYW4gb25seSBkbyBpbnNlcnRpb24gaWYgdGhlcmUgYXJlIGVkaXRzIHJlbWFpbmluZ1xuICAgICAgICBpZiAoZnJhbWUuZWRpdHNSZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgaWYgKFwiKlwiIGluIGZyYW1lLm5vZGUuZWRnZXMpIHtcbiAgICAgICAgICAgIHZhciBpbnNlcnRpb25Ob2RlID0gZnJhbWUubm9kZS5lZGdlc1tcIipcIl07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbnNlcnRpb25Ob2RlID0gbmV3IGx1bnIuVG9rZW5TZXQoKTtcbiAgICAgICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbXCIqXCJdID0gaW5zZXJ0aW9uTm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBpbnNlcnRpb25Ob2RlLmZpbmFsID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICAgIG5vZGU6IGluc2VydGlvbk5vZGUsXG4gICAgICAgICAgICAgIGVkaXRzUmVtYWluaW5nOiBmcmFtZS5lZGl0c1JlbWFpbmluZyAtIDEsXG4gICAgICAgICAgICAgIHN0cjogZnJhbWUuc3RyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFuc3Bvc2l0aW9uXG4gICAgICAgIC8vIGNhbiBvbmx5IGRvIGEgdHJhbnNwb3NpdGlvbiBpZiB0aGVyZSBhcmUgZWRpdHMgcmVtYWluaW5nXG4gICAgICAgIC8vIGFuZCB0aGVyZSBhcmUgZW5vdWdoIGNoYXJhY3RlcnMgdG8gdHJhbnNwb3NlXG4gICAgICAgIGlmIChmcmFtZS5lZGl0c1JlbWFpbmluZyA+IDAgJiYgZnJhbWUuc3RyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB2YXIgY2hhckEgPSBmcmFtZS5zdHIuY2hhckF0KDApLFxuICAgICAgICAgICAgY2hhckIgPSBmcmFtZS5zdHIuY2hhckF0KDEpLFxuICAgICAgICAgICAgdHJhbnNwb3NlTm9kZTtcblxuICAgICAgICAgIGlmIChjaGFyQiBpbiBmcmFtZS5ub2RlLmVkZ2VzKSB7XG4gICAgICAgICAgICB0cmFuc3Bvc2VOb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyQl07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9zZU5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCgpO1xuICAgICAgICAgICAgZnJhbWUubm9kZS5lZGdlc1tjaGFyQl0gPSB0cmFuc3Bvc2VOb2RlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHRyYW5zcG9zZU5vZGUuZmluYWwgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgICAgICAgbm9kZTogdHJhbnNwb3NlTm9kZSxcbiAgICAgICAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgICAgICAgc3RyOiBjaGFyQSArIGZyYW1lLnN0ci5zbGljZSgyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByb290O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVG9rZW5TZXQgZnJvbSBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIFRoZSBzdHJpbmcgbWF5IGNvbnRhaW4gb25lIG9yIG1vcmUgd2lsZGNhcmQgY2hhcmFjdGVycyAoKilcbiAgICAgKiB0aGF0IHdpbGwgYWxsb3cgd2lsZGNhcmQgbWF0Y2hpbmcgd2hlbiBpbnRlcnNlY3Rpbmcgd2l0aFxuICAgICAqIGFub3RoZXIgVG9rZW5TZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBjcmVhdGUgYSBUb2tlblNldCBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICAgICAqL1xuICAgIGx1bnIuVG9rZW5TZXQuZnJvbVN0cmluZyA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIG5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCgpLFxuICAgICAgICByb290ID0gbm9kZSxcbiAgICAgICAgd2lsZGNhcmRGb3VuZCA9IGZhbHNlO1xuXG4gICAgICAvKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcGFzc2VkIHN0cmluZ1xuICAgKiBhcHBlbmRpbmcgYSBub2RlIGZvciBlYWNoIGNoYXJhY3Rlci5cbiAgICpcbiAgICogQXMgc29vbiBhcyBhIHdpbGRjYXJkIGNoYXJhY3RlciBpcyBmb3VuZCB0aGVuIGEgc2VsZlxuICAgKiByZWZlcmVuY2luZyBlZGdlIGlzIGludHJvZHVjZWQgdG8gY29udGludWFsbHkgbWF0Y2hcbiAgICogYW55IG51bWJlciBvZiBhbnkgY2hhcmFjdGVycy5cbiAgICovXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyW2ldLFxuICAgICAgICAgIGZpbmFsID0gaSA9PSBsZW4gLSAxO1xuXG4gICAgICAgIGlmIChjaGFyID09IFwiKlwiKSB7XG4gICAgICAgICAgd2lsZGNhcmRGb3VuZCA9IHRydWU7XG4gICAgICAgICAgbm9kZS5lZGdlc1tjaGFyXSA9IG5vZGU7XG4gICAgICAgICAgbm9kZS5maW5hbCA9IGZpbmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXh0ID0gbmV3IGx1bnIuVG9rZW5TZXQoKTtcbiAgICAgICAgICBuZXh0LmZpbmFsID0gZmluYWw7XG5cbiAgICAgICAgICBub2RlLmVkZ2VzW2NoYXJdID0gbmV4dDtcbiAgICAgICAgICBub2RlID0gbmV4dDtcblxuICAgICAgICAgIC8vIFRPRE86IGlzIHRoaXMgbmVlZGVkIGFueW1vcmU/XG4gICAgICAgICAgaWYgKHdpbGRjYXJkRm91bmQpIHtcbiAgICAgICAgICAgIG5vZGUuZWRnZXNbXCIqXCJdID0gcm9vdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgVG9rZW5TZXQgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzXG4gICAgICogY29udGFpbmVkIHdpdGhpbiB0aGUgVG9rZW5TZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgbHVuci5Ub2tlblNldC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHdvcmRzID0gW107XG5cbiAgICAgIHZhciBzdGFjayA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHByZWZpeDogXCJcIixcbiAgICAgICAgICBub2RlOiB0aGlzXG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGZyYW1lID0gc3RhY2sucG9wKCksXG4gICAgICAgICAgZWRnZXMgPSBPYmplY3Qua2V5cyhmcmFtZS5ub2RlLmVkZ2VzKSxcbiAgICAgICAgICBsZW4gPSBlZGdlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGZyYW1lLm5vZGUuZmluYWwpIHtcbiAgICAgICAgICB3b3Jkcy5wdXNoKGZyYW1lLnByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVkZ2UgPSBlZGdlc1tpXTtcblxuICAgICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgICAgcHJlZml4OiBmcmFtZS5wcmVmaXguY29uY2F0KGVkZ2UpLFxuICAgICAgICAgICAgbm9kZTogZnJhbWUubm9kZS5lZGdlc1tlZGdlXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgVG9rZW5TZXQuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIGludGVuZGVkIHRvIGFsbG93IFRva2VuU2V0cyB0byBiZSB1c2VkIGFzIGtleXNcbiAgICAgKiBpbiBvYmplY3RzLCBsYXJnZWx5IHRvIGFpZCB0aGUgY29uc3RydWN0aW9uIGFuZCBtaW5pbWlzYXRpb25cbiAgICAgKiBvZiBhIFRva2VuU2V0LiBBcyBzdWNoIGl0IGlzIG5vdCBkZXNpZ25lZCB0byBiZSBhIGh1bWFuXG4gICAgICogZnJpZW5kbHkgcmVwcmVzZW50YXRpb24gb2YgdGhlIFRva2VuU2V0LlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBsdW5yLlRva2VuU2V0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gTk9URTogVXNpbmcgT2JqZWN0LmtleXMgaGVyZSBhcyB0aGlzLmVkZ2VzIGlzIHZlcnkgbGlrZWx5XG4gICAgICAvLyB0byBlbnRlciAnaGFzaC1tb2RlJyB3aXRoIG1hbnkga2V5cyBiZWluZyBhZGRlZFxuICAgICAgLy9cbiAgICAgIC8vIGF2b2lkaW5nIGEgZm9yLWluIGxvb3AgaGVyZSBhcyBpdCBsZWFkcyB0byB0aGUgZnVuY3Rpb25cbiAgICAgIC8vIGJlaW5nIGRlLW9wdGltaXNlZCAoYXQgbGVhc3QgaW4gVjgpLiBGcm9tIHNvbWUgc2ltcGxlXG4gICAgICAvLyBiZW5jaG1hcmtzIHRoZSBwZXJmb3JtYW5jZSBpcyBjb21wYXJhYmxlLCBidXQgYWxsb3dpbmdcbiAgICAgIC8vIFY4IHRvIG9wdGltaXplIG1heSBtZWFuIGVhc3kgcGVyZm9ybWFuY2Ugd2lucyBpbiB0aGUgZnV0dXJlLlxuXG4gICAgICBpZiAodGhpcy5fc3RyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHIgPSB0aGlzLmZpbmFsID8gXCIxXCIgOiBcIjBcIixcbiAgICAgICAgbGFiZWxzID0gT2JqZWN0LmtleXModGhpcy5lZGdlcykuc29ydCgpLFxuICAgICAgICBsZW4gPSBsYWJlbHMubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IGxhYmVsc1tpXSxcbiAgICAgICAgICBub2RlID0gdGhpcy5lZGdlc1tsYWJlbF07XG5cbiAgICAgICAgc3RyID0gc3RyICsgbGFiZWwgKyBub2RlLmlkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IFRva2VuU2V0IHRoYXQgaXMgdGhlIGludGVyc2VjdGlvbiBvZlxuICAgICAqIHRoaXMgVG9rZW5TZXQgYW5kIHRoZSBwYXNzZWQgVG9rZW5TZXQuXG4gICAgICpcbiAgICAgKiBUaGlzIGludGVyc2VjdGlvbiB3aWxsIHRha2UgaW50byBhY2NvdW50IGFueSB3aWxkY2FyZHNcbiAgICAgKiBjb250YWluZWQgd2l0aGluIHRoZSBUb2tlblNldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bHVuci5Ub2tlblNldH0gYiAtIEFuIG90aGVyIFRva2VuU2V0IHRvIGludGVyc2VjdCB3aXRoLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICAgICAqL1xuICAgIGx1bnIuVG9rZW5TZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uKGIpIHtcbiAgICAgIHZhciBvdXRwdXQgPSBuZXcgbHVuci5Ub2tlblNldCgpLFxuICAgICAgICBmcmFtZSA9IHVuZGVmaW5lZDtcblxuICAgICAgdmFyIHN0YWNrID0gW1xuICAgICAgICB7XG4gICAgICAgICAgcU5vZGU6IGIsXG4gICAgICAgICAgb3V0cHV0OiBvdXRwdXQsXG4gICAgICAgICAgbm9kZTogdGhpc1xuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIGZyYW1lID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgLy8gTk9URTogQXMgd2l0aCB0aGUgI3RvU3RyaW5nIG1ldGhvZCwgd2UgYXJlIHVzaW5nXG4gICAgICAgIC8vIE9iamVjdC5rZXlzIGFuZCBhIGZvciBsb29wIGluc3RlYWQgb2YgYSBmb3ItaW4gbG9vcFxuICAgICAgICAvLyBhcyBib3RoIG9mIHRoZXNlIG9iamVjdHMgZW50ZXIgJ2hhc2gnIG1vZGUsIGNhdXNpbmdcbiAgICAgICAgLy8gdGhlIGZ1bmN0aW9uIHRvIGJlIGRlLW9wdGltaXNlZCBpbiBWOFxuICAgICAgICB2YXIgcUVkZ2VzID0gT2JqZWN0LmtleXMoZnJhbWUucU5vZGUuZWRnZXMpLFxuICAgICAgICAgIHFMZW4gPSBxRWRnZXMubGVuZ3RoLFxuICAgICAgICAgIG5FZGdlcyA9IE9iamVjdC5rZXlzKGZyYW1lLm5vZGUuZWRnZXMpLFxuICAgICAgICAgIG5MZW4gPSBuRWRnZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIHEgPSAwOyBxIDwgcUxlbjsgcSsrKSB7XG4gICAgICAgICAgdmFyIHFFZGdlID0gcUVkZ2VzW3FdO1xuXG4gICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBuTGVuOyBuKyspIHtcbiAgICAgICAgICAgIHZhciBuRWRnZSA9IG5FZGdlc1tuXTtcblxuICAgICAgICAgICAgaWYgKG5FZGdlID09IHFFZGdlIHx8IHFFZGdlID09IFwiKlwiKSB7XG4gICAgICAgICAgICAgIHZhciBub2RlID0gZnJhbWUubm9kZS5lZGdlc1tuRWRnZV0sXG4gICAgICAgICAgICAgICAgcU5vZGUgPSBmcmFtZS5xTm9kZS5lZGdlc1txRWRnZV0sXG4gICAgICAgICAgICAgICAgZmluYWwgPSBub2RlLmZpbmFsICYmIHFOb2RlLmZpbmFsLFxuICAgICAgICAgICAgICAgIG5leHQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgaWYgKG5FZGdlIGluIGZyYW1lLm91dHB1dC5lZGdlcykge1xuICAgICAgICAgICAgICAgIC8vIGFuIGVkZ2UgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgY2hhcmFjdGVyXG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBjcmVhdGUgYSBuZXcgbm9kZSwganVzdCBzZXQgdGhlIGZpbmFsaXR5XG4gICAgICAgICAgICAgICAgLy8gYml0IHVubGVzcyB0aGlzIG5vZGUgaXMgYWxyZWFkeSBmaW5hbFxuICAgICAgICAgICAgICAgIG5leHQgPSBmcmFtZS5vdXRwdXQuZWRnZXNbbkVkZ2VdO1xuICAgICAgICAgICAgICAgIG5leHQuZmluYWwgPSBuZXh0LmZpbmFsIHx8IGZpbmFsO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vIGVkZ2UgZXhpc3RzIHlldCwgbXVzdCBjcmVhdGUgb25lXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBmaW5hbGl0eSBiaXQgYW5kIGluc2VydCBpdFxuICAgICAgICAgICAgICAgIC8vIGludG8gdGhlIG91dHB1dFxuICAgICAgICAgICAgICAgIG5leHQgPSBuZXcgbHVuci5Ub2tlblNldCgpO1xuICAgICAgICAgICAgICAgIG5leHQuZmluYWwgPSBmaW5hbDtcbiAgICAgICAgICAgICAgICBmcmFtZS5vdXRwdXQuZWRnZXNbbkVkZ2VdID0gbmV4dDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgICAgICAgIHFOb2RlOiBxTm9kZSxcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IG5leHQsXG4gICAgICAgICAgICAgICAgbm9kZTogbm9kZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICAgIGx1bnIuVG9rZW5TZXQuQnVpbGRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5wcmV2aW91c1dvcmQgPSBcIlwiO1xuICAgICAgdGhpcy5yb290ID0gbmV3IGx1bnIuVG9rZW5TZXQoKTtcbiAgICAgIHRoaXMudW5jaGVja2VkTm9kZXMgPSBbXTtcbiAgICAgIHRoaXMubWluaW1pemVkTm9kZXMgPSB7fTtcbiAgICB9O1xuXG4gICAgbHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbih3b3JkKSB7XG4gICAgICB2YXIgbm9kZSxcbiAgICAgICAgY29tbW9uUHJlZml4ID0gMDtcblxuICAgICAgaWYgKHdvcmQgPCB0aGlzLnByZXZpb3VzV29yZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPdXQgb2Ygb3JkZXIgd29yZCBpbnNlcnRpb25cIik7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZC5sZW5ndGggJiYgaSA8IHRoaXMucHJldmlvdXNXb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh3b3JkW2ldICE9IHRoaXMucHJldmlvdXNXb3JkW2ldKSBicmVhaztcbiAgICAgICAgY29tbW9uUHJlZml4Kys7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWluaW1pemUoY29tbW9uUHJlZml4KTtcblxuICAgICAgaWYgKHRoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgbm9kZSA9IHRoaXMucm9vdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLnVuY2hlY2tlZE5vZGVzW3RoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoIC0gMV0uY2hpbGQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSBjb21tb25QcmVmaXg7IGkgPCB3b3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBuZXh0Tm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0KCksXG4gICAgICAgICAgY2hhciA9IHdvcmRbaV07XG5cbiAgICAgICAgbm9kZS5lZGdlc1tjaGFyXSA9IG5leHROb2RlO1xuXG4gICAgICAgIHRoaXMudW5jaGVja2VkTm9kZXMucHVzaCh7XG4gICAgICAgICAgcGFyZW50OiBub2RlLFxuICAgICAgICAgIGNoYXI6IGNoYXIsXG4gICAgICAgICAgY2hpbGQ6IG5leHROb2RlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5vZGUgPSBuZXh0Tm9kZTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5maW5hbCA9IHRydWU7XG4gICAgICB0aGlzLnByZXZpb3VzV29yZCA9IHdvcmQ7XG4gICAgfTtcblxuICAgIGx1bnIuVG9rZW5TZXQuQnVpbGRlci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLm1pbmltaXplKDApO1xuICAgIH07XG5cbiAgICBsdW5yLlRva2VuU2V0LkJ1aWxkZXIucHJvdG90eXBlLm1pbmltaXplID0gZnVuY3Rpb24oZG93blRvKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy51bmNoZWNrZWROb2Rlcy5sZW5ndGggLSAxOyBpID49IGRvd25UbzsgaS0tKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy51bmNoZWNrZWROb2Rlc1tpXSxcbiAgICAgICAgICBjaGlsZEtleSA9IG5vZGUuY2hpbGQudG9TdHJpbmcoKTtcblxuICAgICAgICBpZiAoY2hpbGRLZXkgaW4gdGhpcy5taW5pbWl6ZWROb2Rlcykge1xuICAgICAgICAgIG5vZGUucGFyZW50LmVkZ2VzW25vZGUuY2hhcl0gPSB0aGlzLm1pbmltaXplZE5vZGVzW2NoaWxkS2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDYWNoZSB0aGUga2V5IGZvciB0aGlzIG5vZGUgc2luY2VcbiAgICAgICAgICAvLyB3ZSBrbm93IGl0IGNhbid0IGNoYW5nZSBhbnltb3JlXG4gICAgICAgICAgbm9kZS5jaGlsZC5fc3RyID0gY2hpbGRLZXk7XG5cbiAgICAgICAgICB0aGlzLm1pbmltaXplZE5vZGVzW2NoaWxkS2V5XSA9IG5vZGUuY2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuY2hlY2tlZE5vZGVzLnBvcCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgLyohXG4gKiBsdW5yLkluZGV4XG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuICAgIC8qKlxuICAgICAqIEFuIGluZGV4IGNvbnRhaW5zIHRoZSBidWlsdCBpbmRleCBvZiBhbGwgZG9jdW1lbnRzIGFuZCBwcm92aWRlcyBhIHF1ZXJ5IGludGVyZmFjZVxuICAgICAqIHRvIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIFVzdWFsbHkgaW5zdGFuY2VzIG9mIGx1bnIuSW5kZXggd2lsbCBub3QgYmUgY3JlYXRlZCB1c2luZyB0aGlzIGNvbnN0cnVjdG9yLCBpbnN0ZWFkXG4gICAgICogbHVuci5CdWlsZGVyIHNob3VsZCBiZSB1c2VkIHRvIGNvbnN0cnVjdCBuZXcgaW5kZXhlcywgb3IgbHVuci5JbmRleC5sb2FkIHNob3VsZCBiZVxuICAgICAqIHVzZWQgdG8gbG9hZCBwcmV2aW91c2x5IGJ1aWx0IGFuZCBzZXJpYWxpemVkIGluZGV4ZXMuXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBUaGUgYXR0cmlidXRlcyBvZiB0aGUgYnVpbHQgc2VhcmNoIGluZGV4LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycy5pbnZlcnRlZEluZGV4IC0gQW4gaW5kZXggb2YgdGVybS9maWVsZCB0byBkb2N1bWVudCByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBsdW5yLlZlY3Rvcj59IGF0dHJzLmRvY3VtZW50VmVjdG9ycyAtIERvY3VtZW50IHZlY3RvcnMga2V5ZWQgYnkgZG9jdW1lbnQgcmVmZXJlbmNlLlxuICAgICAqIEBwYXJhbSB7bHVuci5Ub2tlblNldH0gYXR0cnMudG9rZW5TZXQgLSBBbiBzZXQgb2YgYWxsIGNvcnB1cyB0b2tlbnMuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gYXR0cnMuZmllbGRzIC0gVGhlIG5hbWVzIG9mIGluZGV4ZWQgZG9jdW1lbnQgZmllbGRzLlxuICAgICAqIEBwYXJhbSB7bHVuci5QaXBlbGluZX0gYXR0cnMucGlwZWxpbmUgLSBUaGUgcGlwZWxpbmUgdG8gdXNlIGZvciBzZWFyY2ggdGVybXMuXG4gICAgICovXG4gICAgbHVuci5JbmRleCA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgICB0aGlzLmludmVydGVkSW5kZXggPSBhdHRycy5pbnZlcnRlZEluZGV4O1xuICAgICAgdGhpcy5maWVsZFZlY3RvcnMgPSBhdHRycy5maWVsZFZlY3RvcnM7XG4gICAgICB0aGlzLnRva2VuU2V0ID0gYXR0cnMudG9rZW5TZXQ7XG4gICAgICB0aGlzLmZpZWxkcyA9IGF0dHJzLmZpZWxkcztcbiAgICAgIHRoaXMucGlwZWxpbmUgPSBhdHRycy5waXBlbGluZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQSByZXN1bHQgY29udGFpbnMgZGV0YWlscyBvZiBhIGRvY3VtZW50IG1hdGNoaW5nIGEgc2VhcmNoIHF1ZXJ5LlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IGx1bnIuSW5kZXh+UmVzdWx0XG4gICAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJlZiAtIFRoZSByZWZlcmVuY2Ugb2YgdGhlIGRvY3VtZW50IHRoaXMgcmVzdWx0IHJlcHJlc2VudHMuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNjb3JlIC0gQSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxIHJlcHJlc2VudGluZyBob3cgc2ltaWxhciB0aGlzIGRvY3VtZW50IGlzIHRvIHRoZSBxdWVyeS5cbiAgICAgKiBAcHJvcGVydHkge2x1bnIuTWF0Y2hEYXRhfSBtYXRjaERhdGEgLSBDb250YWlucyBtZXRhZGF0YSBhYm91dCB0aGlzIG1hdGNoIGluY2x1ZGluZyB3aGljaCB0ZXJtKHMpIGNhdXNlZCB0aGUgbWF0Y2guXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBBbHRob3VnaCBsdW5yIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIGNyZWF0ZSBxdWVyaWVzIHVzaW5nIGx1bnIuUXVlcnksIGl0IGFsc28gcHJvdmlkZXMgYSBzaW1wbGVcbiAgICAgKiBxdWVyeSBsYW5ndWFnZSB3aGljaCBpdHNlbGYgaXMgcGFyc2VkIGludG8gYW4gaW5zdGFuY2Ugb2YgbHVuci5RdWVyeS5cbiAgICAgKlxuICAgICAqIEZvciBwcm9ncmFtbWF0aWNhbGx5IGJ1aWxkaW5nIHF1ZXJpZXMgaXQgaXMgYWR2aXNlZCB0byBkaXJlY3RseSB1c2UgbHVuci5RdWVyeSwgdGhlIHF1ZXJ5IGxhbmd1YWdlXG4gICAgICogaXMgYmVzdCB1c2VkIGZvciBodW1hbiBlbnRlcmVkIHRleHQgcmF0aGVyIHRoYW4gcHJvZ3JhbSBnZW5lcmF0ZWQgdGV4dC5cbiAgICAgKlxuICAgICAqIEF0IGl0cyBzaW1wbGVzdCBxdWVyaWVzIGNhbiBqdXN0IGJlIGEgc2luZ2xlIHRlcm0sIGUuZy4gYGhlbGxvYCwgbXVsdGlwbGUgdGVybXMgYXJlIGFsc28gc3VwcG9ydGVkXG4gICAgICogYW5kIHdpbGwgYmUgY29tYmluZWQgd2l0aCBPUiwgZS5nIGBoZWxsbyB3b3JsZGAgd2lsbCBtYXRjaCBkb2N1bWVudHMgdGhhdCBjb250YWluIGVpdGhlciAnaGVsbG8nXG4gICAgICogb3IgJ3dvcmxkJywgdGhvdWdoIHRob3NlIHRoYXQgY29udGFpbiBib3RoIHdpbGwgcmFuayBoaWdoZXIgaW4gdGhlIHJlc3VsdHMuXG4gICAgICpcbiAgICAgKiBXaWxkY2FyZHMgY2FuIGJlIGluY2x1ZGVkIGluIHRlcm1zIHRvIG1hdGNoIG9uZSBvciBtb3JlIHVuc3BlY2lmaWVkIGNoYXJhY3RlcnMsIHRoZXNlIHdpbGRjYXJkcyBjYW5cbiAgICAgKiBiZSBpbnNlcnRlZCBhbnl3aGVyZSB3aXRoaW4gdGhlIHRlcm0sIGFuZCBtb3JlIHRoYW4gb25lIHdpbGRjYXJkIGNhbiBleGlzdCBpbiBhIHNpbmdsZSB0ZXJtLiBBZGRpbmdcbiAgICAgKiB3aWxkY2FyZHMgd2lsbCBpbmNyZWFzZSB0aGUgbnVtYmVyIG9mIGRvY3VtZW50cyB0aGF0IHdpbGwgYmUgZm91bmQgYnV0IGNhbiBhbHNvIGhhdmUgYSBuZWdhdGl2ZVxuICAgICAqIGltcGFjdCBvbiBxdWVyeSBwZXJmb3JtYW5jZSwgZXNwZWNpYWxseSB3aXRoIHdpbGRjYXJkcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgdGVybS5cbiAgICAgKlxuICAgICAqIFRlcm1zIGNhbiBiZSByZXN0cmljdGVkIHRvIHNwZWNpZmljIGZpZWxkcywgZS5nLiBgdGl0bGU6aGVsbG9gLCBvbmx5IGRvY3VtZW50cyB3aXRoIHRoZSB0ZXJtXG4gICAgICogaGVsbG8gaW4gdGhlIHRpdGxlIGZpZWxkIHdpbGwgbWF0Y2ggdGhpcyBxdWVyeS4gVXNpbmcgYSBmaWVsZCBub3QgcHJlc2VudCBpbiB0aGUgaW5kZXggd2lsbCBsZWFkXG4gICAgICogdG8gYW4gZXJyb3IgYmVpbmcgdGhyb3duLlxuICAgICAqXG4gICAgICogTW9kaWZpZXJzIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRlcm1zLCBsdW5yIHN1cHBvcnRzIGVkaXQgZGlzdGFuY2UgYW5kIGJvb3N0IG1vZGlmaWVycyBvbiB0ZXJtcy4gQSB0ZXJtXG4gICAgICogYm9vc3Qgd2lsbCBtYWtlIGRvY3VtZW50cyBtYXRjaGluZyB0aGF0IHRlcm0gc2NvcmUgaGlnaGVyLCBlLmcuIGBmb29eNWAuIEVkaXQgZGlzdGFuY2UgaXMgYWxzbyBzdXBwb3J0ZWRcbiAgICAgKiB0byBwcm92aWRlIGZ1enp5IG1hdGNoaW5nLCBlLmcuICdoZWxsb34yJyB3aWxsIG1hdGNoIGRvY3VtZW50cyB3aXRoIGhlbGxvIHdpdGggYW4gZWRpdCBkaXN0YW5jZSBvZiAyLlxuICAgICAqIEF2b2lkIGxhcmdlIHZhbHVlcyBmb3IgZWRpdCBkaXN0YW5jZSB0byBpbXByb3ZlIHF1ZXJ5IHBlcmZvcm1hbmNlLlxuICAgICAqXG4gICAgICogVG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgYmFja3NsYXNoIGNoYXJhY3RlciAnXFwnIGNhbiBiZSB1c2VkLCB0aGlzIGFsbG93cyBzZWFyY2hlcyB0byBpbmNsdWRlXG4gICAgICogY2hhcmFjdGVycyB0aGF0IHdvdWxkIG5vcm1hbGx5IGJlIGNvbnNpZGVyZWQgbW9kaWZpZXJzLCBlLmcuIGBmb29cXH4yYCB3aWxsIHNlYXJjaCBmb3IgYSB0ZXJtIFwiZm9vfjJcIiBpbnN0ZWFkXG4gICAgICogb2YgYXR0ZW1wdGluZyB0byBhcHBseSBhIGJvb3N0IG9mIDIgdG8gdGhlIHNlYXJjaCB0ZXJtIFwiZm9vXCIuXG4gICAgICpcbiAgICAgKiBAdHlwZWRlZiB7c3RyaW5nfSBsdW5yLkluZGV4flF1ZXJ5U3RyaW5nXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U2ltcGxlIHNpbmdsZSB0ZXJtIHF1ZXJ5PC9jYXB0aW9uPlxuICAgICAqIGhlbGxvXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+TXVsdGlwbGUgdGVybSBxdWVyeTwvY2FwdGlvbj5cbiAgICAgKiBoZWxsbyB3b3JsZFxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPnRlcm0gc2NvcGVkIHRvIGEgZmllbGQ8L2NhcHRpb24+XG4gICAgICogdGl0bGU6aGVsbG9cbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj50ZXJtIHdpdGggYSBib29zdCBvZiAxMDwvY2FwdGlvbj5cbiAgICAgKiBoZWxsb14xMFxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPnRlcm0gd2l0aCBhbiBlZGl0IGRpc3RhbmNlIG9mIDI8L2NhcHRpb24+XG4gICAgICogaGVsbG9+MlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBzZWFyY2ggYWdhaW5zdCB0aGUgaW5kZXggdXNpbmcgbHVuciBxdWVyeSBzeW50YXguXG4gICAgICpcbiAgICAgKiBSZXN1bHRzIHdpbGwgYmUgcmV0dXJuZWQgc29ydGVkIGJ5IHRoZWlyIHNjb3JlLCB0aGUgbW9zdCByZWxldmFudCByZXN1bHRzXG4gICAgICogd2lsbCBiZSByZXR1cm5lZCBmaXJzdC5cbiAgICAgKlxuICAgICAqIEZvciBtb3JlIHByb2dyYW1tYXRpYyBxdWVyeWluZyB1c2UgbHVuci5JbmRleCNxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bHVuci5JbmRleH5RdWVyeVN0cmluZ30gcXVlcnlTdHJpbmcgLSBBIHN0cmluZyBjb250YWluaW5nIGEgbHVuciBxdWVyeS5cbiAgICAgKiBAdGhyb3dzIHtsdW5yLlF1ZXJ5UGFyc2VFcnJvcn0gSWYgdGhlIHBhc3NlZCBxdWVyeSBzdHJpbmcgY2Fubm90IGJlIHBhcnNlZC5cbiAgICAgKiBAcmV0dXJucyB7bHVuci5JbmRleH5SZXN1bHRbXX1cbiAgICAgKi9cbiAgICBsdW5yLkluZGV4LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbihxdWVyeVN0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucXVlcnkoZnVuY3Rpb24ocXVlcnkpIHtcbiAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBsdW5yLlF1ZXJ5UGFyc2VyKHF1ZXJ5U3RyaW5nLCBxdWVyeSk7XG4gICAgICAgIHBhcnNlci5wYXJzZSgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgcXVlcnkgYnVpbGRlciBjYWxsYmFjayBwcm92aWRlcyBhIHF1ZXJ5IG9iamVjdCB0byBiZSB1c2VkIHRvIGV4cHJlc3NcbiAgICAgKiB0aGUgcXVlcnkgdG8gcGVyZm9ybSBvbiB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBAY2FsbGJhY2sgbHVuci5JbmRleH5xdWVyeUJ1aWxkZXJcbiAgICAgKiBAcGFyYW0ge2x1bnIuUXVlcnl9IHF1ZXJ5IC0gVGhlIHF1ZXJ5IG9iamVjdCB0byBidWlsZCB1cC5cbiAgICAgKiBAdGhpcyBsdW5yLlF1ZXJ5XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHF1ZXJ5IGFnYWluc3QgdGhlIGluZGV4IHVzaW5nIHRoZSB5aWVsZGVkIGx1bnIuUXVlcnkgb2JqZWN0LlxuICAgICAqXG4gICAgICogSWYgcGVyZm9ybWluZyBwcm9ncmFtbWF0aWMgcXVlcmllcyBhZ2FpbnN0IHRoZSBpbmRleCwgdGhpcyBtZXRob2QgaXMgcHJlZmVycmVkXG4gICAgICogb3ZlciBsdW5yLkluZGV4I3NlYXJjaCBzbyBhcyB0byBhdm9pZCB0aGUgYWRkaXRpb25hbCBxdWVyeSBwYXJzaW5nIG92ZXJoZWFkLlxuICAgICAqXG4gICAgICogQSBxdWVyeSBvYmplY3QgaXMgeWllbGRlZCB0byB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIGJlIHVzZWQgdG9cbiAgICAgKiBleHByZXNzIHRoZSBxdWVyeSB0byBiZSBydW4gYWdhaW5zdCB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgYWx0aG91Z2ggdGhpcyBmdW5jdGlvbiB0YWtlcyBhIGNhbGxiYWNrIHBhcmFtZXRlciBpdCBpcyBfbm90XyBhblxuICAgICAqIGFzeW5jaHJvbm91cyBvcGVyYXRpb24sIHRoZSBjYWxsYmFjayBpcyBqdXN0IHlpZWxkZWQgYSBxdWVyeSBvYmplY3QgdG8gYmVcbiAgICAgKiBjdXN0b21pemVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLkluZGV4fnF1ZXJ5QnVpbGRlcn0gZm4gLSBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBidWlsZCB0aGUgcXVlcnkuXG4gICAgICogQHJldHVybnMge2x1bnIuSW5kZXh+UmVzdWx0W119XG4gICAgICovXG4gICAgbHVuci5JbmRleC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbihmbikge1xuICAgICAgLy8gZm9yIGVhY2ggcXVlcnkgY2xhdXNlXG4gICAgICAvLyAqIHByb2Nlc3MgdGVybXNcbiAgICAgIC8vICogZXhwYW5kIHRlcm1zIGZyb20gdG9rZW4gc2V0XG4gICAgICAvLyAqIGZpbmQgbWF0Y2hpbmcgZG9jdW1lbnRzIGFuZCBtZXRhZGF0YVxuICAgICAgLy8gKiBnZXQgZG9jdW1lbnQgdmVjdG9yc1xuICAgICAgLy8gKiBzY29yZSBkb2N1bWVudHNcblxuICAgICAgdmFyIHF1ZXJ5ID0gbmV3IGx1bnIuUXVlcnkodGhpcy5maWVsZHMpLFxuICAgICAgICBtYXRjaGluZ0ZpZWxkcyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgIHF1ZXJ5VmVjdG9ycyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgIHRlcm1GaWVsZENhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgICAgZm4uY2FsbChxdWVyeSwgcXVlcnkpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXJ5LmNsYXVzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLypcbiAgICAgKiBVbmxlc3MgdGhlIHBpcGVsaW5lIGhhcyBiZWVuIGRpc2FibGVkIGZvciB0aGlzIHRlcm0sIHdoaWNoIGlzXG4gICAgICogdGhlIGNhc2UgZm9yIHRlcm1zIHdpdGggd2lsZGNhcmRzLCB3ZSBuZWVkIHRvIHBhc3MgdGhlIGNsYXVzZVxuICAgICAqIHRlcm0gdGhyb3VnaCB0aGUgc2VhcmNoIHBpcGVsaW5lLiBBIHBpcGVsaW5lIHJldHVybnMgYW4gYXJyYXlcbiAgICAgKiBvZiBwcm9jZXNzZWQgdGVybXMuIFBpcGVsaW5lIGZ1bmN0aW9ucyBtYXkgZXhwYW5kIHRoZSBwYXNzZWRcbiAgICAgKiB0ZXJtLCB3aGljaCBtZWFucyB3ZSBtYXkgZW5kIHVwIHBlcmZvcm1pbmcgbXVsdGlwbGUgaW5kZXggbG9va3Vwc1xuICAgICAqIGZvciBhIHNpbmdsZSBxdWVyeSB0ZXJtLlxuICAgICAqL1xuICAgICAgICB2YXIgY2xhdXNlID0gcXVlcnkuY2xhdXNlc1tpXSxcbiAgICAgICAgICB0ZXJtcyA9IG51bGw7XG5cbiAgICAgICAgaWYgKGNsYXVzZS51c2VQaXBlbGluZSkge1xuICAgICAgICAgIHRlcm1zID0gdGhpcy5waXBlbGluZS5ydW5TdHJpbmcoY2xhdXNlLnRlcm0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlcm1zID0gW2NsYXVzZS50ZXJtXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGVybXMubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICB2YXIgdGVybSA9IHRlcm1zW21dO1xuXG4gICAgICAgICAgLypcbiAgICAgICAqIEVhY2ggdGVybSByZXR1cm5lZCBmcm9tIHRoZSBwaXBlbGluZSBuZWVkcyB0byB1c2UgdGhlIHNhbWUgcXVlcnlcbiAgICAgICAqIGNsYXVzZSBvYmplY3QsIGUuZy4gdGhlIHNhbWUgYm9vc3QgYW5kIG9yIGVkaXQgZGlzdGFuY2UuIFRoZVxuICAgICAgICogc2ltcGxlc3Qgd2F5IHRvIGRvIHRoaXMgaXMgdG8gcmUtdXNlIHRoZSBjbGF1c2Ugb2JqZWN0IGJ1dCBtdXRhdGVcbiAgICAgICAqIGl0cyB0ZXJtIHByb3BlcnR5LlxuICAgICAgICovXG4gICAgICAgICAgY2xhdXNlLnRlcm0gPSB0ZXJtO1xuXG4gICAgICAgICAgLypcbiAgICAgICAqIEZyb20gdGhlIHRlcm0gaW4gdGhlIGNsYXVzZSB3ZSBjcmVhdGUgYSB0b2tlbiBzZXQgd2hpY2ggd2lsbCB0aGVuXG4gICAgICAgKiBiZSB1c2VkIHRvIGludGVyc2VjdCB0aGUgaW5kZXhlcyB0b2tlbiBzZXQgdG8gZ2V0IGEgbGlzdCBvZiB0ZXJtc1xuICAgICAgICogdG8gbG9va3VwIGluIHRoZSBpbnZlcnRlZCBpbmRleFxuICAgICAgICovXG4gICAgICAgICAgdmFyIHRlcm1Ub2tlblNldCA9IGx1bnIuVG9rZW5TZXQuZnJvbUNsYXVzZShjbGF1c2UpLFxuICAgICAgICAgICAgZXhwYW5kZWRUZXJtcyA9IHRoaXMudG9rZW5TZXQuaW50ZXJzZWN0KHRlcm1Ub2tlblNldCkudG9BcnJheSgpO1xuXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBleHBhbmRlZFRlcm1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgKiBGb3IgZWFjaCB0ZXJtIGdldCB0aGUgcG9zdGluZyBhbmQgdGVybUluZGV4LCB0aGlzIGlzIHJlcXVpcmVkIGZvclxuICAgICAgICAgKiBidWlsZGluZyB0aGUgcXVlcnkgdmVjdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBleHBhbmRlZFRlcm0gPSBleHBhbmRlZFRlcm1zW2pdLFxuICAgICAgICAgICAgICBwb3N0aW5nID0gdGhpcy5pbnZlcnRlZEluZGV4W2V4cGFuZGVkVGVybV0sXG4gICAgICAgICAgICAgIHRlcm1JbmRleCA9IHBvc3RpbmcuX2luZGV4O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNsYXVzZS5maWVsZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgKiBGb3IgZWFjaCBmaWVsZCB0aGF0IHRoaXMgcXVlcnkgdGVybSBpcyBzY29wZWQgYnkgKGJ5IGRlZmF1bHRcbiAgICAgICAgICAgKiBhbGwgZmllbGRzIGFyZSBpbiBzY29wZSkgd2UgbmVlZCB0byBnZXQgYWxsIHRoZSBkb2N1bWVudCByZWZzXG4gICAgICAgICAgICogdGhhdCBoYXZlIHRoaXMgdGVybSBpbiB0aGF0IGZpZWxkLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhlIHBvc3RpbmcgaXMgdGhlIGVudHJ5IGluIHRoZSBpbnZlcnRlZEluZGV4IGZvciB0aGUgbWF0Y2hpbmdcbiAgICAgICAgICAgKiB0ZXJtIGZyb20gYWJvdmUuXG4gICAgICAgICAgICovXG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IGNsYXVzZS5maWVsZHNba10sXG4gICAgICAgICAgICAgICAgZmllbGRQb3N0aW5nID0gcG9zdGluZ1tmaWVsZF0sXG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdEb2N1bWVudFJlZnMgPSBPYmplY3Qua2V5cyhmaWVsZFBvc3RpbmcpLFxuICAgICAgICAgICAgICAgIHRlcm1GaWVsZCA9IGV4cGFuZGVkVGVybSArIFwiL1wiICsgZmllbGQ7XG5cbiAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgKiBUbyBzdXBwb3J0IGZpZWxkIGxldmVsIGJvb3N0cyBhIHF1ZXJ5IHZlY3RvciBpcyBjcmVhdGVkIHBlclxuICAgICAgICAgICAqIGZpZWxkLiBUaGlzIHZlY3RvciBpcyBwb3B1bGF0ZWQgdXNpbmcgdGhlIHRlcm1JbmRleCBmb3VuZCBmb3JcbiAgICAgICAgICAgKiB0aGUgdGVybSBhbmQgYSB1bml0IHZhbHVlIHdpdGggdGhlIGFwcHJvcHJpYXRlIGJvb3N0IGFwcGxpZWQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBJZiB0aGUgcXVlcnkgdmVjdG9yIGZvciB0aGlzIGZpZWxkIGRvZXMgbm90IGV4aXN0IHlldCBpdCBuZWVkc1xuICAgICAgICAgICAqIHRvIGJlIGNyZWF0ZWQuXG4gICAgICAgICAgICovXG4gICAgICAgICAgICAgIGlmIChxdWVyeVZlY3RvcnNbZmllbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBxdWVyeVZlY3RvcnNbZmllbGRdID0gbmV3IGx1bnIuVmVjdG9yKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAqIFVzaW5nIHVwc2VydCBiZWNhdXNlIHRoZXJlIGNvdWxkIGFscmVhZHkgYmUgYW4gZW50cnkgaW4gdGhlIHZlY3RvclxuICAgICAgICAgICAqIGZvciB0aGUgdGVybSB3ZSBhcmUgd29ya2luZyB3aXRoLiBJbiB0aGF0IGNhc2Ugd2UganVzdCBhZGQgdGhlIHNjb3Jlc1xuICAgICAgICAgICAqIHRvZ2V0aGVyLlxuICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBxdWVyeVZlY3RvcnNbZmllbGRdLnVwc2VydCh0ZXJtSW5kZXgsIDEgKiBjbGF1c2UuYm9vc3QsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgIGEsXG4gICAgICAgICAgICAgICAgYlxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBJZiB3ZSd2ZSBhbHJlYWR5IHNlZW4gdGhpcyB0ZXJtLCBmaWVsZCBjb21ibyB0aGVuIHdlJ3ZlIGFscmVhZHkgY29sbGVjdGVkXG4gICAgICAgICAgICAgICAqIHRoZSBtYXRjaGluZyBkb2N1bWVudHMgYW5kIG1ldGFkYXRhLCBubyBuZWVkIHRvIGdvIHRocm91Z2ggYWxsIHRoYXQgYWdhaW5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGlmICh0ZXJtRmllbGRDYWNoZVt0ZXJtRmllbGRdKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IG1hdGNoaW5nRG9jdW1lbnRSZWZzLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIEFsbCBtZXRhZGF0YSBmb3IgdGhpcyB0ZXJtL2ZpZWxkL2RvY3VtZW50IHRyaXBsZVxuICAgICAgICAgICAgICogYXJlIHRoZW4gZXh0cmFjdGVkIGFuZCBjb2xsZWN0ZWQgaW50byBhbiBpbnN0YW5jZVxuICAgICAgICAgICAgICogb2YgbHVuci5NYXRjaERhdGEgcmVhZHkgdG8gYmUgcmV0dXJuZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgICAgICAgKiByZXN1bHRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hpbmdEb2N1bWVudFJlZiA9IG1hdGNoaW5nRG9jdW1lbnRSZWZzW2xdLFxuICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdGaWVsZFJlZiA9IG5ldyBsdW5yLkZpZWxkUmVmKFxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0RvY3VtZW50UmVmLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZFxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0gZmllbGRQb3N0aW5nW21hdGNoaW5nRG9jdW1lbnRSZWZdLFxuICAgICAgICAgICAgICAgICAgZmllbGRNYXRjaDtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIChmaWVsZE1hdGNoID0gbWF0Y2hpbmdGaWVsZHNbbWF0Y2hpbmdGaWVsZFJlZl0pID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIG1hdGNoaW5nRmllbGRzW21hdGNoaW5nRmllbGRSZWZdID0gbmV3IGx1bnIuTWF0Y2hEYXRhKFxuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFRlcm0sXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmllbGRNYXRjaC5hZGQoZXhwYW5kZWRUZXJtLCBmaWVsZCwgbWV0YWRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRlcm1GaWVsZENhY2hlW3Rlcm1GaWVsZF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2hpbmdGaWVsZFJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0ZpZWxkcyksXG4gICAgICAgIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgbWF0Y2hlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF0Y2hpbmdGaWVsZFJlZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLypcbiAgICAgKiBDdXJyZW50bHkgd2UgaGF2ZSBkb2N1bWVudCBmaWVsZHMgdGhhdCBtYXRjaCB0aGUgcXVlcnksIGJ1dCB3ZVxuICAgICAqIG5lZWQgdG8gcmV0dXJuIGRvY3VtZW50cy4gVGhlIG1hdGNoRGF0YSBhbmQgc2NvcmVzIGFyZSBjb21iaW5lZFxuICAgICAqIGZyb20gbXVsdGlwbGUgZmllbGRzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIFNjb3JlcyBhcmUgY2FsY3VsYXRlZCBieSBmaWVsZCwgdXNpbmcgdGhlIHF1ZXJ5IHZlY3RvcnMgY3JlYXRlZFxuICAgICAqIGFib3ZlLCBhbmQgY29tYmluZWQgaW50byBhIGZpbmFsIGRvY3VtZW50IHNjb3JlIHVzaW5nIGFkZGl0aW9uLlxuICAgICAqL1xuICAgICAgICB2YXIgZmllbGRSZWYgPSBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcobWF0Y2hpbmdGaWVsZFJlZnNbaV0pLFxuICAgICAgICAgIGRvY1JlZiA9IGZpZWxkUmVmLmRvY1JlZixcbiAgICAgICAgICBmaWVsZFZlY3RvciA9IHRoaXMuZmllbGRWZWN0b3JzW2ZpZWxkUmVmXSxcbiAgICAgICAgICBzY29yZSA9IHF1ZXJ5VmVjdG9yc1tmaWVsZFJlZi5maWVsZE5hbWVdLnNpbWlsYXJpdHkoZmllbGRWZWN0b3IpLFxuICAgICAgICAgIGRvY01hdGNoO1xuXG4gICAgICAgIGlmICgoZG9jTWF0Y2ggPSBtYXRjaGVzW2RvY1JlZl0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkb2NNYXRjaC5zY29yZSArPSBzY29yZTtcbiAgICAgICAgICBkb2NNYXRjaC5tYXRjaERhdGEuY29tYmluZShtYXRjaGluZ0ZpZWxkc1tmaWVsZFJlZl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtYXRjaCA9IHtcbiAgICAgICAgICAgIHJlZjogZG9jUmVmLFxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgbWF0Y2hEYXRhOiBtYXRjaGluZ0ZpZWxkc1tmaWVsZFJlZl1cbiAgICAgICAgICB9O1xuICAgICAgICAgIG1hdGNoZXNbZG9jUmVmXSA9IG1hdGNoO1xuICAgICAgICAgIHJlc3VsdHMucHVzaChtYXRjaCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLypcbiAgICogU29ydCB0aGUgcmVzdWx0cyBvYmplY3RzIGJ5IHNjb3JlLCBoaWdoZXN0IGZpcnN0LlxuICAgKi9cbiAgICAgIHJldHVybiByZXN1bHRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYi5zY29yZSAtIGEuc2NvcmU7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgdGhlIGluZGV4IGZvciBKU09OIHNlcmlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBUaGUgc2NoZW1hIGZvciB0aGlzIEpTT04gYmxvYiB3aWxsIGJlIGRlc2NyaWJlZCBpbiBhXG4gICAgICogc2VwYXJhdGUgSlNPTiBzY2hlbWEgZmlsZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgbHVuci5JbmRleC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW52ZXJ0ZWRJbmRleCA9IE9iamVjdC5rZXlzKHRoaXMuaW52ZXJ0ZWRJbmRleClcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICAgICAgICByZXR1cm4gW3Rlcm0sIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXV07XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICB2YXIgZmllbGRWZWN0b3JzID0gT2JqZWN0LmtleXModGhpcy5maWVsZFZlY3RvcnMpLm1hcChmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgcmV0dXJuIFtyZWYsIHRoaXMuZmllbGRWZWN0b3JzW3JlZl0udG9KU09OKCldO1xuICAgICAgfSwgdGhpcyk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZlcnNpb246IGx1bnIudmVyc2lvbixcbiAgICAgICAgZmllbGRzOiB0aGlzLmZpZWxkcyxcbiAgICAgICAgZmllbGRWZWN0b3JzOiBmaWVsZFZlY3RvcnMsXG4gICAgICAgIGludmVydGVkSW5kZXg6IGludmVydGVkSW5kZXgsXG4gICAgICAgIHBpcGVsaW5lOiB0aGlzLnBpcGVsaW5lLnRvSlNPTigpXG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXplZCBsdW5yLkluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZEluZGV4IC0gQSBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgbHVuci5JbmRleFxuICAgICAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICAgICAqL1xuICAgIGx1bnIuSW5kZXgubG9hZCA9IGZ1bmN0aW9uKHNlcmlhbGl6ZWRJbmRleCkge1xuICAgICAgdmFyIGF0dHJzID0ge30sXG4gICAgICAgIGZpZWxkVmVjdG9ycyA9IHt9LFxuICAgICAgICBzZXJpYWxpemVkVmVjdG9ycyA9IHNlcmlhbGl6ZWRJbmRleC5maWVsZFZlY3RvcnMsXG4gICAgICAgIGludmVydGVkSW5kZXggPSB7fSxcbiAgICAgICAgc2VyaWFsaXplZEludmVydGVkSW5kZXggPSBzZXJpYWxpemVkSW5kZXguaW52ZXJ0ZWRJbmRleCxcbiAgICAgICAgdG9rZW5TZXRCdWlsZGVyID0gbmV3IGx1bnIuVG9rZW5TZXQuQnVpbGRlcigpLFxuICAgICAgICBwaXBlbGluZSA9IGx1bnIuUGlwZWxpbmUubG9hZChzZXJpYWxpemVkSW5kZXgucGlwZWxpbmUpO1xuXG4gICAgICBpZiAoc2VyaWFsaXplZEluZGV4LnZlcnNpb24gIT0gbHVuci52ZXJzaW9uKSB7XG4gICAgICAgIGx1bnIudXRpbHMud2FybihcbiAgICAgICAgICBcIlZlcnNpb24gbWlzbWF0Y2ggd2hlbiBsb2FkaW5nIHNlcmlhbGlzZWQgaW5kZXguIEN1cnJlbnQgdmVyc2lvbiBvZiBsdW5yICdcIiArXG4gICAgICAgICAgICBsdW5yLnZlcnNpb24gK1xuICAgICAgICAgICAgXCInIGRvZXMgbm90IG1hdGNoIHNlcmlhbGl6ZWQgaW5kZXggJ1wiICtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWRJbmRleC52ZXJzaW9uICtcbiAgICAgICAgICAgIFwiJ1wiXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWFsaXplZFZlY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR1cGxlID0gc2VyaWFsaXplZFZlY3RvcnNbaV0sXG4gICAgICAgICAgcmVmID0gdHVwbGVbMF0sXG4gICAgICAgICAgZWxlbWVudHMgPSB0dXBsZVsxXTtcblxuICAgICAgICBmaWVsZFZlY3RvcnNbcmVmXSA9IG5ldyBsdW5yLlZlY3RvcihlbGVtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWFsaXplZEludmVydGVkSW5kZXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR1cGxlID0gc2VyaWFsaXplZEludmVydGVkSW5kZXhbaV0sXG4gICAgICAgICAgdGVybSA9IHR1cGxlWzBdLFxuICAgICAgICAgIHBvc3RpbmcgPSB0dXBsZVsxXTtcblxuICAgICAgICB0b2tlblNldEJ1aWxkZXIuaW5zZXJ0KHRlcm0pO1xuICAgICAgICBpbnZlcnRlZEluZGV4W3Rlcm1dID0gcG9zdGluZztcbiAgICAgIH1cblxuICAgICAgdG9rZW5TZXRCdWlsZGVyLmZpbmlzaCgpO1xuXG4gICAgICBhdHRycy5maWVsZHMgPSBzZXJpYWxpemVkSW5kZXguZmllbGRzO1xuXG4gICAgICBhdHRycy5maWVsZFZlY3RvcnMgPSBmaWVsZFZlY3RvcnM7XG4gICAgICBhdHRycy5pbnZlcnRlZEluZGV4ID0gaW52ZXJ0ZWRJbmRleDtcbiAgICAgIGF0dHJzLnRva2VuU2V0ID0gdG9rZW5TZXRCdWlsZGVyLnJvb3Q7XG4gICAgICBhdHRycy5waXBlbGluZSA9IHBpcGVsaW5lO1xuXG4gICAgICByZXR1cm4gbmV3IGx1bnIuSW5kZXgoYXR0cnMpO1xuICAgIH07XG4gICAgLyohXG4gKiBsdW5yLkJ1aWxkZXJcbiAqIENvcHlyaWdodCAoQykgMjAxNyBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4gICAgLyoqXG4gICAgICogbHVuci5CdWlsZGVyIHBlcmZvcm1zIGluZGV4aW5nIG9uIGEgc2V0IG9mIGRvY3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm5zIGluc3RhbmNlcyBvZiBsdW5yLkluZGV4IHJlYWR5IGZvciBxdWVyeWluZy5cbiAgICAgKlxuICAgICAqIEFsbCBjb25maWd1cmF0aW9uIG9mIHRoZSBpbmRleCBpcyBkb25lIHZpYSB0aGUgYnVpbGRlciwgdGhlXG4gICAgICogZmllbGRzIHRvIGluZGV4LCB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlLCB0aGUgdGV4dCBwcm9jZXNzaW5nXG4gICAgICogcGlwZWxpbmUgYW5kIGRvY3VtZW50IHNjb3JpbmcgcGFyYW1ldGVycyBhcmUgYWxsIHNldCBvbiB0aGVcbiAgICAgKiBidWlsZGVyIGJlZm9yZSBpbmRleGluZy5cbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBfcmVmIC0gSW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSBkb2N1bWVudCByZWZlcmVuY2UgZmllbGQuXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmdbXX0gX2ZpZWxkcyAtIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgZmllbGRzIHRvIGluZGV4LlxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBpbnZlcnRlZEluZGV4IC0gVGhlIGludmVydGVkIGluZGV4IG1hcHMgdGVybXMgdG8gZG9jdW1lbnQgZmllbGRzLlxuICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkb2N1bWVudFRlcm1GcmVxdWVuY2llcyAtIEtlZXBzIHRyYWNrIG9mIGRvY3VtZW50IHRlcm0gZnJlcXVlbmNpZXMuXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRvY3VtZW50TGVuZ3RocyAtIEtlZXBzIHRyYWNrIG9mIHRoZSBsZW5ndGggb2YgZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAgICAgKiBAcHJvcGVydHkge2x1bnIudG9rZW5pemVyfSB0b2tlbml6ZXIgLSBGdW5jdGlvbiBmb3Igc3BsaXR0aW5nIHN0cmluZ3MgaW50byB0b2tlbnMgZm9yIGluZGV4aW5nLlxuICAgICAqIEBwcm9wZXJ0eSB7bHVuci5QaXBlbGluZX0gcGlwZWxpbmUgLSBUaGUgcGlwZWxpbmUgcGVyZm9ybXMgdGV4dCBwcm9jZXNzaW5nIG9uIHRva2VucyBiZWZvcmUgaW5kZXhpbmcuXG4gICAgICogQHByb3BlcnR5IHtsdW5yLlBpcGVsaW5lfSBzZWFyY2hQaXBlbGluZSAtIEEgcGlwZWxpbmUgZm9yIHByb2Nlc3Npbmcgc2VhcmNoIHRlcm1zIGJlZm9yZSBxdWVyeWluZyB0aGUgaW5kZXguXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRvY3VtZW50Q291bnQgLSBLZWVwcyB0cmFjayBvZiB0aGUgdG90YWwgbnVtYmVyIG9mIGRvY3VtZW50cyBpbmRleGVkLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfYiAtIEEgcGFyYW1ldGVyIHRvIGNvbnRyb2wgZmllbGQgbGVuZ3RoIG5vcm1hbGl6YXRpb24sIHNldHRpbmcgdGhpcyB0byAwIGRpc2FibGVkIG5vcm1hbGl6YXRpb24sIDEgZnVsbHkgbm9ybWFsaXplcyBmaWVsZCBsZW5ndGhzLCB0aGUgZGVmYXVsdCB2YWx1ZSBpcyAwLjc1LlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfazEgLSBBIHBhcmFtZXRlciB0byBjb250cm9sIGhvdyBxdWlja2x5IGFuIGluY3JlYXNlIGluIHRlcm0gZnJlcXVlbmN5IHJlc3VsdHMgaW4gdGVybSBmcmVxdWVuY3kgc2F0dXJhdGlvbiwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgMS4yLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0ZXJtSW5kZXggLSBBIGNvdW50ZXIgaW5jcmVtZW50ZWQgZm9yIGVhY2ggdW5pcXVlIHRlcm0sIHVzZWQgdG8gaWRlbnRpZnkgYSB0ZXJtcyBwb3NpdGlvbiBpbiB0aGUgdmVjdG9yIHNwYWNlLlxuICAgICAqIEBwcm9wZXJ0eSB7YXJyYXl9IG1ldGFkYXRhV2hpdGVsaXN0IC0gQSBsaXN0IG9mIG1ldGFkYXRhIGtleXMgdGhhdCBoYXZlIGJlZW4gd2hpdGVsaXN0ZWQgZm9yIGVudHJ5IGluIHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICBsdW5yLkJ1aWxkZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3JlZiA9IFwiaWRcIjtcbiAgICAgIHRoaXMuX2ZpZWxkcyA9IFtdO1xuICAgICAgdGhpcy5pbnZlcnRlZEluZGV4ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHRoaXMuZmllbGRUZXJtRnJlcXVlbmNpZXMgPSB7fTtcbiAgICAgIHRoaXMuZmllbGRMZW5ndGhzID0ge307XG4gICAgICB0aGlzLnRva2VuaXplciA9IGx1bnIudG9rZW5pemVyO1xuICAgICAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lKCk7XG4gICAgICB0aGlzLnNlYXJjaFBpcGVsaW5lID0gbmV3IGx1bnIuUGlwZWxpbmUoKTtcbiAgICAgIHRoaXMuZG9jdW1lbnRDb3VudCA9IDA7XG4gICAgICB0aGlzLl9iID0gMC43NTtcbiAgICAgIHRoaXMuX2sxID0gMS4yO1xuICAgICAgdGhpcy50ZXJtSW5kZXggPSAwO1xuICAgICAgdGhpcy5tZXRhZGF0YVdoaXRlbGlzdCA9IFtdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkb2N1bWVudCBmaWVsZCB1c2VkIGFzIHRoZSBkb2N1bWVudCByZWZlcmVuY2UuIEV2ZXJ5IGRvY3VtZW50IG11c3QgaGF2ZSB0aGlzIGZpZWxkLlxuICAgICAqIFRoZSB0eXBlIG9mIHRoaXMgZmllbGQgaW4gdGhlIGRvY3VtZW50IHNob3VsZCBiZSBhIHN0cmluZywgaWYgaXQgaXMgbm90IGEgc3RyaW5nIGl0IHdpbGwgYmVcbiAgICAgKiBjb2VyY2VkIGludG8gYSBzdHJpbmcgYnkgY2FsbGluZyB0b1N0cmluZy5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHJlZiBpcyAnaWQnLlxuICAgICAqXG4gICAgICogVGhlIHJlZiBzaG91bGQgX25vdF8gYmUgY2hhbmdlZCBkdXJpbmcgaW5kZXhpbmcsIGl0IHNob3VsZCBiZSBzZXQgYmVmb3JlIGFueSBkb2N1bWVudHMgYXJlXG4gICAgICogYWRkZWQgdG8gdGhlIGluZGV4LiBDaGFuZ2luZyBpdCBkdXJpbmcgaW5kZXhpbmcgY2FuIGxlYWQgdG8gaW5jb25zaXN0ZW50IHJlc3VsdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gVGhlIG5hbWUgb2YgdGhlIHJlZmVyZW5jZSBmaWVsZCBpbiB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbihyZWYpIHtcbiAgICAgIHRoaXMuX3JlZiA9IHJlZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGRvY3VtZW50IGZpZWxkcyB0aGF0IHdpbGwgYmUgaW5kZXhlZC4gRXZlcnkgZG9jdW1lbnQgYmVpbmdcbiAgICAgKiBpbmRleGVkIHNob3VsZCBoYXZlIHRoaXMgZmllbGQuIE51bGwgdmFsdWVzIGZvciB0aGlzIGZpZWxkIGluIGluZGV4ZWQgZG9jdW1lbnRzIHdpbGxcbiAgICAgKiBub3QgY2F1c2UgZXJyb3JzIGJ1dCB3aWxsIGxpbWl0IHRoZSBjaGFuY2Ugb2YgdGhhdCBkb2N1bWVudCBiZWluZyByZXRyaWV2ZWQgYnkgc2VhcmNoZXMuXG4gICAgICpcbiAgICAgKiBBbGwgZmllbGRzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgYWRkaW5nIGRvY3VtZW50cyB0byB0aGUgaW5kZXguIEFkZGluZyBmaWVsZHMgYWZ0ZXJcbiAgICAgKiBhIGRvY3VtZW50IGhhcyBiZWVuIGluZGV4ZWQgd2lsbCBoYXZlIG5vIGVmZmVjdCBvbiBhbHJlYWR5IGluZGV4ZWQgZG9jdW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkIC0gVGhlIG5hbWUgb2YgYSBmaWVsZCB0byBpbmRleCBpbiBhbGwgZG9jdW1lbnRzLlxuICAgICAqL1xuICAgIGx1bnIuQnVpbGRlci5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdGhpcy5fZmllbGRzLnB1c2goZmllbGQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBIHBhcmFtZXRlciB0byB0dW5lIHRoZSBhbW91bnQgb2YgZmllbGQgbGVuZ3RoIG5vcm1hbGlzYXRpb24gdGhhdCBpcyBhcHBsaWVkIHdoZW5cbiAgICAgKiBjYWxjdWxhdGluZyByZWxldmFuY2Ugc2NvcmVzLiBBIHZhbHVlIG9mIDAgd2lsbCBjb21wbGV0ZWx5IGRpc2FibGUgYW55IG5vcm1hbGlzYXRpb25cbiAgICAgKiBhbmQgYSB2YWx1ZSBvZiAxIHdpbGwgZnVsbHkgbm9ybWFsaXNlIGZpZWxkIGxlbmd0aHMuIFRoZSBkZWZhdWx0IGlzIDAuNzUuIFZhbHVlcyBvZiBiXG4gICAgICogd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSByYW5nZSAwIC0gMS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgdmFsdWUgdG8gc2V0IGZvciB0aGlzIHR1bmluZyBwYXJhbWV0ZXIuXG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5iID0gZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICB0aGlzLl9iID0gMDtcbiAgICAgIH0gZWxzZSBpZiAobnVtYmVyID4gMSkge1xuICAgICAgICB0aGlzLl9iID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2IgPSBudW1iZXI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEEgcGFyYW1ldGVyIHRoYXQgY29udHJvbHMgdGhlIHNwZWVkIGF0IHdoaWNoIGEgcmlzZSBpbiB0ZXJtIGZyZXF1ZW5jeSByZXN1bHRzIGluIHRlcm1cbiAgICAgKiBmcmVxdWVuY3kgc2F0dXJhdGlvbi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMS4yLiBTZXR0aW5nIHRoaXMgdG8gYSBoaWdoZXIgdmFsdWUgd2lsbCBnaXZlXG4gICAgICogc2xvd2VyIHNhdHVyYXRpb24gbGV2ZWxzLCBhIGxvd2VyIHZhbHVlIHdpbGwgcmVzdWx0IGluIHF1aWNrZXIgc2F0dXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgdmFsdWUgdG8gc2V0IGZvciB0aGlzIHR1bmluZyBwYXJhbWV0ZXIuXG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5rMSA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgdGhpcy5fazEgPSBudW1iZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBkb2N1bWVudCB0byB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBCZWZvcmUgYWRkaW5nIGZpZWxkcyB0byB0aGUgaW5kZXggdGhlIGluZGV4IHNob3VsZCBoYXZlIGJlZW4gZnVsbHkgc2V0dXAsIHdpdGggdGhlIGRvY3VtZW50XG4gICAgICogcmVmIGFuZCBhbGwgZmllbGRzIHRvIGluZGV4IGFscmVhZHkgaGF2aW5nIGJlZW4gc3BlY2lmaWVkLlxuICAgICAqXG4gICAgICogVGhlIGRvY3VtZW50IG11c3QgaGF2ZSBhIGZpZWxkIG5hbWUgYXMgc3BlY2lmaWVkIGJ5IHRoZSByZWYgKGJ5IGRlZmF1bHQgdGhpcyBpcyAnaWQnKSBhbmRcbiAgICAgKiBpdCBzaG91bGQgaGF2ZSBhbGwgZmllbGRzIGRlZmluZWQgZm9yIGluZGV4aW5nLCB0aG91Z2ggbnVsbCBvciB1bmRlZmluZWQgdmFsdWVzIHdpbGwgbm90XG4gICAgICogY2F1c2UgZXJyb3JzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRvYyAtIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICAgICAqL1xuICAgIGx1bnIuQnVpbGRlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICB2YXIgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl07XG5cbiAgICAgIHRoaXMuZG9jdW1lbnRDb3VudCArPSAxO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZmllbGROYW1lID0gdGhpcy5fZmllbGRzW2ldLFxuICAgICAgICAgIGZpZWxkID0gZG9jW2ZpZWxkTmFtZV0sXG4gICAgICAgICAgdG9rZW5zID0gdGhpcy50b2tlbml6ZXIoZmllbGQpLFxuICAgICAgICAgIHRlcm1zID0gdGhpcy5waXBlbGluZS5ydW4odG9rZW5zKSxcbiAgICAgICAgICBmaWVsZFJlZiA9IG5ldyBsdW5yLkZpZWxkUmVmKGRvY1JlZiwgZmllbGROYW1lKSxcbiAgICAgICAgICBmaWVsZFRlcm1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgICAgICB0aGlzLmZpZWxkVGVybUZyZXF1ZW5jaWVzW2ZpZWxkUmVmXSA9IGZpZWxkVGVybXM7XG4gICAgICAgIHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXSA9IDA7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGxlbmd0aCBvZiB0aGlzIGZpZWxkIGZvciB0aGlzIGRvY3VtZW50XG4gICAgICAgIHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXSArPSB0ZXJtcy5sZW5ndGg7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRlcm0gZnJlcXVlbmNpZXMgZm9yIHRoaXMgZmllbGRcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0ZXJtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciB0ZXJtID0gdGVybXNbal07XG5cbiAgICAgICAgICBpZiAoZmllbGRUZXJtc1t0ZXJtXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZpZWxkVGVybXNbdGVybV0gPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpZWxkVGVybXNbdGVybV0gKz0gMTtcblxuICAgICAgICAgIC8vIGFkZCB0byBpbnZlcnRlZCBpbmRleFxuICAgICAgICAgIC8vIGNyZWF0ZSBhbiBpbml0aWFsIHBvc3RpbmcgaWYgb25lIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICBpZiAodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHBvc3RpbmcgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgcG9zdGluZ1tcIl9pbmRleFwiXSA9IHRoaXMudGVybUluZGV4O1xuICAgICAgICAgICAgdGhpcy50ZXJtSW5kZXggKz0gMTtcblxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgcG9zdGluZ1t0aGlzLl9maWVsZHNba11dID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dID0gcG9zdGluZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBhZGQgYW4gZW50cnkgZm9yIHRoaXMgdGVybS9maWVsZE5hbWUvZG9jUmVmIHRvIHRoZSBpbnZlcnRlZEluZGV4XG4gICAgICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXVtmaWVsZE5hbWVdW2RvY1JlZl0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzdG9yZSBhbGwgd2hpdGVsaXN0ZWQgbWV0YWRhdGEgYWJvdXQgdGhpcyB0b2tlbiBpbiB0aGVcbiAgICAgICAgICAvLyBpbnZlcnRlZCBpbmRleFxuICAgICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgdGhpcy5tZXRhZGF0YVdoaXRlbGlzdC5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhS2V5ID0gdGhpcy5tZXRhZGF0YVdoaXRlbGlzdFtsXSxcbiAgICAgICAgICAgICAgbWV0YWRhdGEgPSB0ZXJtLm1ldGFkYXRhW21ldGFkYXRhS2V5XTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XSA9PVxuICAgICAgICAgICAgICB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdW21ldGFkYXRhS2V5XS5wdXNoKFxuICAgICAgICAgICAgICBtZXRhZGF0YVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYXZlcmFnZSBkb2N1bWVudCBsZW5ndGggZm9yIHRoaXMgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5jYWxjdWxhdGVBdmVyYWdlRmllbGRMZW5ndGhzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZmllbGRSZWZzID0gT2JqZWN0LmtleXModGhpcy5maWVsZExlbmd0aHMpLFxuICAgICAgICBudW1iZXJPZkZpZWxkcyA9IGZpZWxkUmVmcy5sZW5ndGgsXG4gICAgICAgIGFjY3VtdWxhdG9yID0ge30sXG4gICAgICAgIGRvY3VtZW50c1dpdGhGaWVsZCA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mRmllbGRzOyBpKyspIHtcbiAgICAgICAgdmFyIGZpZWxkUmVmID0gbHVuci5GaWVsZFJlZi5mcm9tU3RyaW5nKGZpZWxkUmVmc1tpXSksXG4gICAgICAgICAgZmllbGQgPSBmaWVsZFJlZi5maWVsZE5hbWU7XG5cbiAgICAgICAgZG9jdW1lbnRzV2l0aEZpZWxkW2ZpZWxkXSB8fCAoZG9jdW1lbnRzV2l0aEZpZWxkW2ZpZWxkXSA9IDApO1xuICAgICAgICBkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdICs9IDE7XG5cbiAgICAgICAgYWNjdW11bGF0b3JbZmllbGRdIHx8IChhY2N1bXVsYXRvcltmaWVsZF0gPSAwKTtcbiAgICAgICAgYWNjdW11bGF0b3JbZmllbGRdICs9IHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5fZmllbGRzW2ldO1xuICAgICAgICBhY2N1bXVsYXRvcltmaWVsZF0gPSBhY2N1bXVsYXRvcltmaWVsZF0gLyBkb2N1bWVudHNXaXRoRmllbGRbZmllbGRdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmF2ZXJhZ2VGaWVsZExlbmd0aCA9IGFjY3VtdWxhdG9yO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgYSB2ZWN0b3Igc3BhY2UgbW9kZWwgb2YgZXZlcnkgZG9jdW1lbnQgdXNpbmcgbHVuci5WZWN0b3JcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5jcmVhdGVGaWVsZFZlY3RvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmaWVsZFZlY3RvcnMgPSB7fSxcbiAgICAgICAgZmllbGRSZWZzID0gT2JqZWN0LmtleXModGhpcy5maWVsZFRlcm1GcmVxdWVuY2llcyksXG4gICAgICAgIGZpZWxkUmVmc0xlbmd0aCA9IGZpZWxkUmVmcy5sZW5ndGgsXG4gICAgICAgIHRlcm1JZGZDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRSZWZzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpZWxkUmVmID0gbHVuci5GaWVsZFJlZi5mcm9tU3RyaW5nKGZpZWxkUmVmc1tpXSksXG4gICAgICAgICAgZmllbGQgPSBmaWVsZFJlZi5maWVsZE5hbWUsXG4gICAgICAgICAgZmllbGRMZW5ndGggPSB0aGlzLmZpZWxkTGVuZ3Roc1tmaWVsZFJlZl0sXG4gICAgICAgICAgZmllbGRWZWN0b3IgPSBuZXcgbHVuci5WZWN0b3IoKSxcbiAgICAgICAgICB0ZXJtRnJlcXVlbmNpZXMgPSB0aGlzLmZpZWxkVGVybUZyZXF1ZW5jaWVzW2ZpZWxkUmVmXSxcbiAgICAgICAgICB0ZXJtcyA9IE9iamVjdC5rZXlzKHRlcm1GcmVxdWVuY2llcyksXG4gICAgICAgICAgdGVybXNMZW5ndGggPSB0ZXJtcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0ZXJtc0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIHRlcm0gPSB0ZXJtc1tqXSxcbiAgICAgICAgICAgIHRmID0gdGVybUZyZXF1ZW5jaWVzW3Rlcm1dLFxuICAgICAgICAgICAgdGVybUluZGV4ID0gdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dLl9pbmRleCxcbiAgICAgICAgICAgIGlkZixcbiAgICAgICAgICAgIHNjb3JlLFxuICAgICAgICAgICAgc2NvcmVXaXRoUHJlY2lzaW9uO1xuXG4gICAgICAgICAgaWYgKHRlcm1JZGZDYWNoZVt0ZXJtXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZGYgPSBsdW5yLmlkZih0aGlzLmludmVydGVkSW5kZXhbdGVybV0sIHRoaXMuZG9jdW1lbnRDb3VudCk7XG4gICAgICAgICAgICB0ZXJtSWRmQ2FjaGVbdGVybV0gPSBpZGY7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlkZiA9IHRlcm1JZGZDYWNoZVt0ZXJtXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzY29yZSA9XG4gICAgICAgICAgICBpZGYgKlxuICAgICAgICAgICAgKCh0aGlzLl9rMSArIDEpICogdGYpIC9cbiAgICAgICAgICAgICh0aGlzLl9rMSAqXG4gICAgICAgICAgICAgICgxIC1cbiAgICAgICAgICAgICAgICB0aGlzLl9iICtcbiAgICAgICAgICAgICAgICB0aGlzLl9iICogKGZpZWxkTGVuZ3RoIC8gdGhpcy5hdmVyYWdlRmllbGRMZW5ndGhbZmllbGRdKSkgK1xuICAgICAgICAgICAgICB0Zik7XG4gICAgICAgICAgc2NvcmVXaXRoUHJlY2lzaW9uID0gTWF0aC5yb3VuZChzY29yZSAqIDEwMDApIC8gMTAwMDtcbiAgICAgICAgICAvLyBDb252ZXJ0cyAxLjIzNDU2Nzg5IHRvIDEuMjM0LlxuICAgICAgICAgIC8vIFJlZHVjaW5nIHRoZSBwcmVjaXNpb24gc28gdGhhdCB0aGUgdmVjdG9ycyB0YWtlIHVwIGxlc3NcbiAgICAgICAgICAvLyBzcGFjZSB3aGVuIHNlcmlhbGlzZWQuIERvaW5nIGl0IG5vdyBzbyB0aGF0IHRoZXkgYmVoYXZlXG4gICAgICAgICAgLy8gdGhlIHNhbWUgYmVmb3JlIGFuZCBhZnRlciBzZXJpYWxpc2F0aW9uLiBBbHNvLCB0aGlzIGlzXG4gICAgICAgICAgLy8gdGhlIGZhc3Rlc3QgYXBwcm9hY2ggdG8gcmVkdWNpbmcgYSBudW1iZXIncyBwcmVjaXNpb24gaW5cbiAgICAgICAgICAvLyBKYXZhU2NyaXB0LlxuXG4gICAgICAgICAgZmllbGRWZWN0b3IuaW5zZXJ0KHRlcm1JbmRleCwgc2NvcmVXaXRoUHJlY2lzaW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkVmVjdG9yc1tmaWVsZFJlZl0gPSBmaWVsZFZlY3RvcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5maWVsZFZlY3RvcnMgPSBmaWVsZFZlY3RvcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0b2tlbiBzZXQgb2YgYWxsIHRva2VucyBpbiB0aGUgaW5kZXggdXNpbmcgbHVuci5Ub2tlblNldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBsdW5yLkJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZVRva2VuU2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRva2VuU2V0ID0gbHVuci5Ub2tlblNldC5mcm9tQXJyYXkoXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW52ZXJ0ZWRJbmRleCkuc29ydCgpXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIGluZGV4LCBjcmVhdGluZyBhbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4LlxuICAgICAqXG4gICAgICogVGhpcyBjb21wbGV0ZXMgdGhlIGluZGV4aW5nIHByb2Nlc3MgYW5kIHNob3VsZCBvbmx5IGJlIGNhbGxlZFxuICAgICAqIG9uY2UgYWxsIGRvY3VtZW50cyBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQHJldHVybnMge2x1bnIuSW5kZXh9XG4gICAgICovXG4gICAgbHVuci5CdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVBdmVyYWdlRmllbGRMZW5ndGhzKCk7XG4gICAgICB0aGlzLmNyZWF0ZUZpZWxkVmVjdG9ycygpO1xuICAgICAgdGhpcy5jcmVhdGVUb2tlblNldCgpO1xuXG4gICAgICByZXR1cm4gbmV3IGx1bnIuSW5kZXgoe1xuICAgICAgICBpbnZlcnRlZEluZGV4OiB0aGlzLmludmVydGVkSW5kZXgsXG4gICAgICAgIGZpZWxkVmVjdG9yczogdGhpcy5maWVsZFZlY3RvcnMsXG4gICAgICAgIHRva2VuU2V0OiB0aGlzLnRva2VuU2V0LFxuICAgICAgICBmaWVsZHM6IHRoaXMuX2ZpZWxkcyxcbiAgICAgICAgcGlwZWxpbmU6IHRoaXMuc2VhcmNoUGlwZWxpbmVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGEgcGx1Z2luIHRvIHRoZSBpbmRleCBidWlsZGVyLlxuICAgICAqXG4gICAgICogQSBwbHVnaW4gaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBidWlsZGVyIGFzIGl0cyBjb250ZXh0LlxuICAgICAqIFBsdWdpbnMgY2FuIGJlIHVzZWQgdG8gY3VzdG9taXNlIG9yIGV4dGVuZCB0aGUgYmVoYXZpb3VyIG9mIHRoZSBpbmRleFxuICAgICAqIGluIHNvbWUgd2F5LiBBIHBsdWdpbiBpcyBqdXN0IGEgZnVuY3Rpb24sIHRoYXQgZW5jYXBzdWxhdGVkIHRoZSBjdXN0b21cbiAgICAgKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB3aGVuIGJ1aWxkaW5nIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoZSBwbHVnaW4gZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgaW5kZXggYnVpbGRlciBhcyBpdHMgYXJndW1lbnQsIGFkZGl0aW9uYWxcbiAgICAgKiBhcmd1bWVudHMgY2FuIGFsc28gYmUgcGFzc2VkIHdoZW4gY2FsbGluZyB1c2UuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICAgICAqIHdpdGggdGhlIGluZGV4IGJ1aWxkZXIgYXMgaXRzIGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW4gVGhlIHBsdWdpbiB0byBhcHBseS5cbiAgICAgKi9cbiAgICBsdW5yLkJ1aWxkZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbnRhaW5zIGFuZCBjb2xsZWN0cyBtZXRhZGF0YSBhYm91dCBhIG1hdGNoaW5nIGRvY3VtZW50LlxuICAgICAqIEEgc2luZ2xlIGluc3RhbmNlIG9mIGx1bnIuTWF0Y2hEYXRhIGlzIHJldHVybmVkIGFzIHBhcnQgb2YgZXZlcnlcbiAgICAgKiBsdW5yLkluZGV4flJlc3VsdC5cbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXJtIC0gVGhlIHRlcm0gdGhpcyBtYXRjaCBkYXRhIGlzIGFzc29jaWF0ZWQgd2l0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCAtIFRoZSBmaWVsZCBpbiB3aGljaCB0aGUgdGVybSB3YXMgZm91bmRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgLSBUaGUgbWV0YWRhdGEgcmVjb3JkZWQgYWJvdXQgdGhpcyB0ZXJtIGluIHRoaXMgZmllbGRcbiAgICAgKiBAcHJvcGVydHkge29iamVjdH0gbWV0YWRhdGEgLSBBIGNsb25lZCBjb2xsZWN0aW9uIG9mIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRvY3VtZW50LlxuICAgICAqIEBzZWUge0BsaW5rIGx1bnIuSW5kZXh+UmVzdWx0fVxuICAgICAqL1xuICAgIGx1bnIuTWF0Y2hEYXRhID0gZnVuY3Rpb24odGVybSwgZmllbGQsIG1ldGFkYXRhKSB7XG4gICAgICB2YXIgY2xvbmVkTWV0YWRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICBtZXRhZGF0YUtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG5cbiAgICAgIC8vIENsb25pbmcgdGhlIG1ldGFkYXRhIHRvIHByZXZlbnQgdGhlIG9yaWdpbmFsXG4gICAgICAvLyBiZWluZyBtdXRhdGVkIGR1cmluZyBtYXRjaCBkYXRhIGNvbWJpbmF0aW9uLlxuICAgICAgLy8gTWV0YWRhdGEgaXMga2VwdCBpbiBhbiBhcnJheSB3aXRoaW4gdGhlIGludmVydGVkXG4gICAgICAvLyBpbmRleCBzbyBjbG9uaW5nIHRoZSBkYXRhIGNhbiBiZSBkb25lIHdpdGhcbiAgICAgIC8vIEFycmF5I3NsaWNlXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFkYXRhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gbWV0YWRhdGFLZXlzW2ldO1xuICAgICAgICBjbG9uZWRNZXRhZGF0YVtrZXldID0gbWV0YWRhdGFba2V5XS5zbGljZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1ldGFkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBjbG9uZWRNZXRhZGF0YTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgbHVuci5NYXRjaERhdGEgd2lsbCBiZSBjcmVhdGVkIGZvciBldmVyeSB0ZXJtIHRoYXQgbWF0Y2hlcyBhXG4gICAgICogZG9jdW1lbnQuIEhvd2V2ZXIgb25seSBvbmUgaW5zdGFuY2UgaXMgcmVxdWlyZWQgaW4gYSBsdW5yLkluZGV4flJlc3VsdC4gVGhpc1xuICAgICAqIG1ldGhvZCBjb21iaW5lcyBtZXRhZGF0YSBmcm9tIGFub3RoZXIgaW5zdGFuY2Ugb2YgbHVuci5NYXRjaERhdGEgd2l0aCB0aGlzXG4gICAgICogb2JqZWN0cyBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bHVuci5NYXRjaERhdGF9IG90aGVyTWF0Y2hEYXRhIC0gQW5vdGhlciBpbnN0YW5jZSBvZiBtYXRjaCBkYXRhIHRvIG1lcmdlIHdpdGggdGhpcyBvbmUuXG4gICAgICogQHNlZSB7QGxpbmsgbHVuci5JbmRleH5SZXN1bHR9XG4gICAgICovXG4gICAgbHVuci5NYXRjaERhdGEucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbihvdGhlck1hdGNoRGF0YSkge1xuICAgICAgdmFyIHRlcm1zID0gT2JqZWN0LmtleXMob3RoZXJNYXRjaERhdGEubWV0YWRhdGEpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ZXJtID0gdGVybXNbaV0sXG4gICAgICAgICAgZmllbGRzID0gT2JqZWN0LmtleXMob3RoZXJNYXRjaERhdGEubWV0YWRhdGFbdGVybV0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmaWVsZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNbal0sXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMob3RoZXJNYXRjaERhdGEubWV0YWRhdGFbdGVybV1bZmllbGRdKTtcblxuICAgICAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGtleXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2tdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9XG4gICAgICAgICAgICAgICAgb3RoZXJNYXRjaERhdGEubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID0gdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1bXG4gICAgICAgICAgICAgICAga2V5XG4gICAgICAgICAgICAgIF0uY29uY2F0KG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIG1ldGFkYXRhIGZvciBhIHRlcm0vZmllbGQgcGFpciB0byB0aGlzIGluc3RhbmNlIG9mIG1hdGNoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGVybSAtIFRoZSB0ZXJtIHRoaXMgbWF0Y2ggZGF0YSBpcyBhc3NvY2lhdGVkIHdpdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgZmllbGQgaW4gd2hpY2ggdGhlIHRlcm0gd2FzIGZvdW5kXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhIC0gVGhlIG1ldGFkYXRhIHJlY29yZGVkIGFib3V0IHRoaXMgdGVybSBpbiB0aGlzIGZpZWxkXG4gICAgICovXG4gICAgbHVuci5NYXRjaERhdGEucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHRlcm0sIGZpZWxkLCBtZXRhZGF0YSkge1xuICAgICAgaWYgKCEodGVybSBpbiB0aGlzLm1ldGFkYXRhKSkge1xuICAgICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBtZXRhZGF0YTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShmaWVsZCBpbiB0aGlzLm1ldGFkYXRhW3Rlcm1dKSkge1xuICAgICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IG1ldGFkYXRhO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtZXRhZGF0YUtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGFLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBtZXRhZGF0YUtleXNbaV07XG5cbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSkge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtcbiAgICAgICAgICAgIGtleVxuICAgICAgICAgIF0uY29uY2F0KG1ldGFkYXRhW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSBtZXRhZGF0YVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIGx1bnIuUXVlcnkgcHJvdmlkZXMgYSBwcm9ncmFtbWF0aWMgd2F5IG9mIGRlZmluaW5nIHF1ZXJpZXMgdG8gYmUgcGVyZm9ybWVkXG4gICAgICogYWdhaW5zdCBhIHtAbGluayBsdW5yLkluZGV4fS5cbiAgICAgKlxuICAgICAqIFByZWZlciBjb25zdHJ1Y3RpbmcgYSBsdW5yLlF1ZXJ5IHVzaW5nIHRoZSB7QGxpbmsgbHVuci5JbmRleCNxdWVyeX0gbWV0aG9kXG4gICAgICogc28gdGhlIHF1ZXJ5IG9iamVjdCBpcyBwcmUtaW5pdGlhbGl6ZWQgd2l0aCB0aGUgcmlnaHQgaW5kZXggZmllbGRzLlxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHByb3BlcnR5IHtsdW5yLlF1ZXJ5fkNsYXVzZVtdfSBjbGF1c2VzIC0gQW4gYXJyYXkgb2YgcXVlcnkgY2xhdXNlcy5cbiAgICAgKiBAcHJvcGVydHkge3N0cmluZ1tdfSBhbGxGaWVsZHMgLSBBbiBhcnJheSBvZiBhbGwgYXZhaWxhYmxlIGZpZWxkcyBpbiBhIGx1bnIuSW5kZXguXG4gICAgICovXG4gICAgbHVuci5RdWVyeSA9IGZ1bmN0aW9uKGFsbEZpZWxkcykge1xuICAgICAgdGhpcy5jbGF1c2VzID0gW107XG4gICAgICB0aGlzLmFsbEZpZWxkcyA9IGFsbEZpZWxkcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RhbnRzIGZvciBpbmRpY2F0aW5nIHdoYXQga2luZCBvZiBhdXRvbWF0aWMgd2lsZGNhcmQgaW5zZXJ0aW9uIHdpbGwgYmUgdXNlZCB3aGVuIGNvbnN0cnVjdGluZyBhIHF1ZXJ5IGNsYXVzZS5cbiAgICAgKlxuICAgICAqIFRoaXMgYWxsb3dzIHdpbGRjYXJkcyB0byBiZSBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSB0ZXJtIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IGRvIGFueSBzdHJpbmdcbiAgICAgKiBjb25jYXRlbmF0aW9uLlxuICAgICAqXG4gICAgICogVGhlIHdpbGRjYXJkIGNvbnN0YW50cyBjYW4gYmUgYml0d2lzZSBjb21iaW5lZCB0byBzZWxlY3QgYm90aCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aWxkY2FyZHMuXG4gICAgICpcbiAgICAgKiBAY29uc3RhbnRcbiAgICAgKiBAZGVmYXVsdFxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWxkY2FyZC5OT05FIC0gVGhlIHRlcm0gd2lsbCBoYXZlIG5vIHdpbGRjYXJkcyBpbnNlcnRlZCwgdGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gd2lsZGNhcmQuTEVBRElORyAtIFByZXBlbmQgdGhlIHRlcm0gd2l0aCBhIHdpbGRjYXJkLCB1bmxlc3MgYSBsZWFkaW5nIHdpbGRjYXJkIGFscmVhZHkgZXhpc3RzXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLlRSQUlMSU5HIC0gQXBwZW5kIGEgd2lsZGNhcmQgdG8gdGhlIHRlcm0sIHVubGVzcyBhIHRyYWlsaW5nIHdpbGRjYXJkIGFscmVhZHkgZXhpc3RzXG4gICAgICogQHNlZSBsdW5yLlF1ZXJ5fkNsYXVzZVxuICAgICAqIEBzZWUgbHVuci5RdWVyeSNjbGF1c2VcbiAgICAgKiBAc2VlIGx1bnIuUXVlcnkjdGVybVxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPnF1ZXJ5IHRlcm0gd2l0aCB0cmFpbGluZyB3aWxkY2FyZDwvY2FwdGlvbj5cbiAgICAgKiBxdWVyeS50ZXJtKCdmb28nLCB7IHdpbGRjYXJkOiBsdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HIH0pXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+cXVlcnkgdGVybSB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICAgICAqIHF1ZXJ5LnRlcm0oJ2ZvbycsIHtcbiAgICAgKiAgIHdpbGRjYXJkOiBsdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcgfCBsdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HXG4gICAgICogfSlcbiAgICAgKi9cbiAgICBsdW5yLlF1ZXJ5LndpbGRjYXJkID0gbmV3IFN0cmluZyhcIipcIik7XG4gICAgbHVuci5RdWVyeS53aWxkY2FyZC5OT05FID0gMDtcbiAgICBsdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcgPSAxO1xuICAgIGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkcgPSAyO1xuXG4gICAgLyoqXG4gICAgICogQSBzaW5nbGUgY2xhdXNlIGluIGEge0BsaW5rIGx1bnIuUXVlcnl9IGNvbnRhaW5zIGEgdGVybSBhbmQgZGV0YWlscyBvbiBob3cgdG9cbiAgICAgKiBtYXRjaCB0aGF0IHRlcm0gYWdhaW5zdCBhIHtAbGluayBsdW5yLkluZGV4fS5cbiAgICAgKlxuICAgICAqIEB0eXBlZGVmIHtPYmplY3R9IGx1bnIuUXVlcnl+Q2xhdXNlXG4gICAgICogQHByb3BlcnR5IHtzdHJpbmdbXX0gZmllbGRzIC0gVGhlIGZpZWxkcyBpbiBhbiBpbmRleCB0aGlzIGNsYXVzZSBzaG91bGQgYmUgbWF0Y2hlZCBhZ2FpbnN0LlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbYm9vc3Q9MV0gLSBBbnkgYm9vc3QgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB3aGVuIG1hdGNoaW5nIHRoaXMgY2xhdXNlLlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbZWRpdERpc3RhbmNlXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGhhdmUgZnV6enkgbWF0Y2hpbmcgYXBwbGllZCwgYW5kIGhvdyBmdXp6eSB0aGUgbWF0Y2ggc2hvdWxkIGJlLlxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVBpcGVsaW5lXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBzZWFyY2ggcGlwZWxpbmUuXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IFt3aWxkY2FyZD0wXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGhhdmUgd2lsZGNhcmRzIGFwcGVuZGVkIG9yIHByZXBlbmRlZC5cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSB7QGxpbmsgbHVuci5RdWVyeX5DbGF1c2V9IHRvIHRoaXMgcXVlcnkuXG4gICAgICpcbiAgICAgKiBVbmxlc3MgdGhlIGNsYXVzZSBjb250YWlucyB0aGUgZmllbGRzIHRvIGJlIG1hdGNoZWQgYWxsIGZpZWxkcyB3aWxsIGJlIG1hdGNoZWQuIEluIGFkZGl0aW9uXG4gICAgICogYSBkZWZhdWx0IGJvb3N0IG9mIDEgaXMgYXBwbGllZCB0byB0aGUgY2xhdXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtsdW5yLlF1ZXJ5fkNsYXVzZX0gY2xhdXNlIC0gVGhlIGNsYXVzZSB0byBhZGQgdG8gdGhpcyBxdWVyeS5cbiAgICAgKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gICAgICogQHJldHVybnMge2x1bnIuUXVlcnl9XG4gICAgICovXG4gICAgbHVuci5RdWVyeS5wcm90b3R5cGUuY2xhdXNlID0gZnVuY3Rpb24oY2xhdXNlKSB7XG4gICAgICBpZiAoIShcImZpZWxkc1wiIGluIGNsYXVzZSkpIHtcbiAgICAgICAgY2xhdXNlLmZpZWxkcyA9IHRoaXMuYWxsRmllbGRzO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShcImJvb3N0XCIgaW4gY2xhdXNlKSkge1xuICAgICAgICBjbGF1c2UuYm9vc3QgPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShcInVzZVBpcGVsaW5lXCIgaW4gY2xhdXNlKSkge1xuICAgICAgICBjbGF1c2UudXNlUGlwZWxpbmUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShcIndpbGRjYXJkXCIgaW4gY2xhdXNlKSkge1xuICAgICAgICBjbGF1c2Uud2lsZGNhcmQgPSBsdW5yLlF1ZXJ5LndpbGRjYXJkLk5PTkU7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgY2xhdXNlLndpbGRjYXJkICYgbHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HICYmXG4gICAgICAgIGNsYXVzZS50ZXJtLmNoYXJBdCgwKSAhPSBsdW5yLlF1ZXJ5LndpbGRjYXJkXG4gICAgICApIHtcbiAgICAgICAgY2xhdXNlLnRlcm0gPSBcIipcIiArIGNsYXVzZS50ZXJtO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGNsYXVzZS53aWxkY2FyZCAmIGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkcgJiZcbiAgICAgICAgY2xhdXNlLnRlcm0uc2xpY2UoLTEpICE9IGx1bnIuUXVlcnkud2lsZGNhcmRcbiAgICAgICkge1xuICAgICAgICBjbGF1c2UudGVybSA9IFwiXCIgKyBjbGF1c2UudGVybSArIFwiKlwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsYXVzZXMucHVzaChjbGF1c2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHRlcm0gdG8gdGhlIGN1cnJlbnQgcXVlcnksIHVuZGVyIHRoZSBjb3ZlcnMgdGhpcyB3aWxsIGNyZWF0ZSBhIHtAbGluayBsdW5yLlF1ZXJ5fkNsYXVzZX1cbiAgICAgKiB0byB0aGUgbGlzdCBvZiBjbGF1c2VzIHRoYXQgbWFrZSB1cCB0aGlzIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRlcm0gLSBUaGUgdGVybSB0byBhZGQgdG8gdGhlIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBbnkgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRvIGFkZCB0byB0aGUgcXVlcnkgY2xhdXNlLlxuICAgICAqIEByZXR1cm5zIHtsdW5yLlF1ZXJ5fVxuICAgICAqIEBzZWUgbHVuci5RdWVyeSNjbGF1c2VcbiAgICAgKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+YWRkaW5nIGEgc2luZ2xlIHRlcm0gdG8gYSBxdWVyeTwvY2FwdGlvbj5cbiAgICAgKiBxdWVyeS50ZXJtKFwiZm9vXCIpXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+YWRkaW5nIGEgc2luZ2xlIHRlcm0gdG8gYSBxdWVyeSBhbmQgc3BlY2lmeWluZyBzZWFyY2ggZmllbGRzLCB0ZXJtIGJvb3N0IGFuZCBhdXRvbWF0aWMgdHJhaWxpbmcgd2lsZGNhcmQ8L2NhcHRpb24+XG4gICAgICogcXVlcnkudGVybShcImZvb1wiLCB7XG4gICAgICogICBmaWVsZHM6IFtcInRpdGxlXCJdLFxuICAgICAqICAgYm9vc3Q6IDEwLFxuICAgICAqICAgd2lsZGNhcmQ6IGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkdcbiAgICAgKiB9KVxuICAgICAqL1xuICAgIGx1bnIuUXVlcnkucHJvdG90eXBlLnRlcm0gPSBmdW5jdGlvbih0ZXJtLCBvcHRpb25zKSB7XG4gICAgICB2YXIgY2xhdXNlID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgIGNsYXVzZS50ZXJtID0gdGVybTtcblxuICAgICAgdGhpcy5jbGF1c2UoY2xhdXNlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBsdW5yLlF1ZXJ5UGFyc2VFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHN0YXJ0LCBlbmQpIHtcbiAgICAgIHRoaXMubmFtZSA9IFwiUXVlcnlQYXJzZUVycm9yXCI7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlQYXJzZUVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuICAgIGx1bnIuUXVlcnlMZXhlciA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdGhpcy5sZXhlbWVzID0gW107XG4gICAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICAgIHRoaXMubGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgIHRoaXMuc3RhcnQgPSAwO1xuICAgICAgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zID0gW107XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RhdGUgPSBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dDtcblxuICAgICAgd2hpbGUgKHN0YXRlKSB7XG4gICAgICAgIHN0YXRlID0gc3RhdGUodGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuc2xpY2VTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdWJTbGljZXMgPSBbXSxcbiAgICAgICAgc2xpY2VTdGFydCA9IHRoaXMuc3RhcnQsXG4gICAgICAgIHNsaWNlRW5kID0gdGhpcy5wb3M7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWNlRW5kID0gdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zW2ldO1xuICAgICAgICBzdWJTbGljZXMucHVzaCh0aGlzLnN0ci5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCkpO1xuICAgICAgICBzbGljZVN0YXJ0ID0gc2xpY2VFbmQgKyAxO1xuICAgICAgfVxuXG4gICAgICBzdWJTbGljZXMucHVzaCh0aGlzLnN0ci5zbGljZShzbGljZVN0YXJ0LCB0aGlzLnBvcykpO1xuICAgICAgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zLmxlbmd0aCA9IDA7XG5cbiAgICAgIHJldHVybiBzdWJTbGljZXMuam9pbihcIlwiKTtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgdGhpcy5sZXhlbWVzLnB1c2goe1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBzdHI6IHRoaXMuc2xpY2VTdHJpbmcoKSxcbiAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICAgIGVuZDogdGhpcy5wb3NcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnN0YXJ0ID0gdGhpcy5wb3M7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuZXNjYXBlQ2hhcmFjdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnMucHVzaCh0aGlzLnBvcyAtIDEpO1xuICAgICAgdGhpcy5wb3MgKz0gMTtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5wb3MgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5FT1M7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGFyID0gdGhpcy5zdHIuY2hhckF0KHRoaXMucG9zKTtcbiAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICByZXR1cm4gY2hhcjtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9zIC0gdGhpcy5zdGFydDtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5pZ25vcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0ID09IHRoaXMucG9zKSB7XG4gICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLnBvcztcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5iYWNrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucG9zIC09IDE7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuYWNjZXB0RGlnaXRSdW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFyLCBjaGFyQ29kZTtcblxuICAgICAgZG8ge1xuICAgICAgICBjaGFyID0gdGhpcy5uZXh0KCk7XG4gICAgICAgIGNoYXJDb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgfSB3aGlsZSAoY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4KTtcblxuICAgICAgaWYgKGNoYXIgIT0gbHVuci5RdWVyeUxleGVyLkVPUykge1xuICAgICAgICB0aGlzLmJhY2t1cCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLm1vcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnBvcyA8IHRoaXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5TGV4ZXIuRU9TID0gXCJFT1NcIjtcbiAgICBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQgPSBcIkZJRUxEXCI7XG4gICAgbHVuci5RdWVyeUxleGVyLlRFUk0gPSBcIlRFUk1cIjtcbiAgICBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRSA9IFwiRURJVF9ESVNUQU5DRVwiO1xuICAgIGx1bnIuUXVlcnlMZXhlci5CT09TVCA9IFwiQk9PU1RcIjtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5sZXhGaWVsZCA9IGZ1bmN0aW9uKGxleGVyKSB7XG4gICAgICBsZXhlci5iYWNrdXAoKTtcbiAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLkZJRUxEKTtcbiAgICAgIGxleGVyLmlnbm9yZSgpO1xuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0O1xuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGVybSA9IGZ1bmN0aW9uKGxleGVyKSB7XG4gICAgICBpZiAobGV4ZXIud2lkdGgoKSA+IDEpIHtcbiAgICAgICAgbGV4ZXIuYmFja3VwKCk7XG4gICAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pO1xuICAgICAgfVxuXG4gICAgICBsZXhlci5pZ25vcmUoKTtcblxuICAgICAgaWYgKGxleGVyLm1vcmUoKSkge1xuICAgICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5sZXhFZGl0RGlzdGFuY2UgPSBmdW5jdGlvbihsZXhlcikge1xuICAgICAgbGV4ZXIuaWdub3JlKCk7XG4gICAgICBsZXhlci5hY2NlcHREaWdpdFJ1bigpO1xuICAgICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRSk7XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHQ7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5sZXhCb29zdCA9IGZ1bmN0aW9uKGxleGVyKSB7XG4gICAgICBsZXhlci5pZ25vcmUoKTtcbiAgICAgIGxleGVyLmFjY2VwdERpZ2l0UnVuKCk7XG4gICAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5CT09TVCk7XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHQ7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlMZXhlci5sZXhFT1MgPSBmdW5jdGlvbihsZXhlcikge1xuICAgICAgaWYgKGxleGVyLndpZHRoKCkgPiAwKSB7XG4gICAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBUaGlzIG1hdGNoZXMgdGhlIHNlcGFyYXRvciB1c2VkIHdoZW4gdG9rZW5pc2luZyBmaWVsZHNcbiAgICAvLyB3aXRoaW4gYSBkb2N1bWVudC4gVGhlc2Ugc2hvdWxkIG1hdGNoIG90aGVyd2lzZSBpdCBpc1xuICAgIC8vIG5vdCBwb3NzaWJsZSB0byBzZWFyY2ggZm9yIHNvbWUgdG9rZW5zIHdpdGhpbiBhIGRvY3VtZW50LlxuICAgIC8vXG4gICAgLy8gSXQgaXMgcG9zc2libGUgZm9yIHRoZSB1c2VyIHRvIGNoYW5nZSB0aGUgc2VwYXJhdG9yIG9uIHRoZVxuICAgIC8vIHRva2VuaXplciBzbyBpdCBfbWlnaHRfIGNsYXNoIHdpdGggYW55IG90aGVyIG9mIHRoZSBzcGVjaWFsXG4gICAgLy8gY2hhcmFjdGVycyBhbHJlYWR5IHVzZWQgd2l0aGluIHRoZSBzZWFyY2ggc3RyaW5nLCBlLmcuIDouXG4gICAgLy9cbiAgICAvLyBUaGlzIG1lYW5zIHRoYXQgaXQgaXMgcG9zc2libGUgdG8gY2hhbmdlIHRoZSBzZXBhcmF0b3IgaW5cbiAgICAvLyBzdWNoIGEgd2F5IHRoYXQgbWFrZXMgc29tZSB3b3JkcyB1bnNlYXJjaGFibGUgdXNpbmcgYSBzZWFyY2hcbiAgICAvLyBzdHJpbmcuXG4gICAgbHVuci5RdWVyeUxleGVyLnRlcm1TZXBhcmF0b3IgPSBsdW5yLnRva2VuaXplci5zZXBhcmF0b3I7XG5cbiAgICBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dCA9IGZ1bmN0aW9uKGxleGVyKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgY2hhciA9IGxleGVyLm5leHQoKTtcblxuICAgICAgICBpZiAoY2hhciA9PSBsdW5yLlF1ZXJ5TGV4ZXIuRU9TKSB7XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhFT1M7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFc2NhcGUgY2hhcmFjdGVyIGlzICdcXCdcbiAgICAgICAgaWYgKGNoYXIuY2hhckNvZGVBdCgwKSA9PSA5Mikge1xuICAgICAgICAgIGxleGVyLmVzY2FwZUNoYXJhY3RlcigpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYXIgPT0gXCI6XCIpIHtcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEZpZWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYXIgPT0gXCJ+XCIpIHtcbiAgICAgICAgICBsZXhlci5iYWNrdXAoKTtcbiAgICAgICAgICBpZiAobGV4ZXIud2lkdGgoKSA+IDApIHtcbiAgICAgICAgICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEVkaXREaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFyID09IFwiXlwiKSB7XG4gICAgICAgICAgbGV4ZXIuYmFja3VwKCk7XG4gICAgICAgICAgaWYgKGxleGVyLndpZHRoKCkgPiAwKSB7XG4gICAgICAgICAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5URVJNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhCb29zdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFyLm1hdGNoKGx1bnIuUXVlcnlMZXhlci50ZXJtU2VwYXJhdG9yKSkge1xuICAgICAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGVybTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5UGFyc2VyID0gZnVuY3Rpb24oc3RyLCBxdWVyeSkge1xuICAgICAgdGhpcy5sZXhlciA9IG5ldyBsdW5yLlF1ZXJ5TGV4ZXIoc3RyKTtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgIHRoaXMuY3VycmVudENsYXVzZSA9IHt9O1xuICAgICAgdGhpcy5sZXhlbWVJZHggPSAwO1xuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5UGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sZXhlci5ydW4oKTtcbiAgICAgIHRoaXMubGV4ZW1lcyA9IHRoaXMubGV4ZXIubGV4ZW1lcztcblxuICAgICAgdmFyIHN0YXRlID0gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkT3JUZXJtO1xuXG4gICAgICB3aGlsZSAoc3RhdGUpIHtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZSh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucXVlcnk7XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlQYXJzZXIucHJvdG90eXBlLnBlZWtMZXhlbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmxleGVtZXNbdGhpcy5sZXhlbWVJZHhdO1xuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5UGFyc2VyLnByb3RvdHlwZS5jb25zdW1lTGV4ZW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGV4ZW1lID0gdGhpcy5wZWVrTGV4ZW1lKCk7XG4gICAgICB0aGlzLmxleGVtZUlkeCArPSAxO1xuICAgICAgcmV0dXJuIGxleGVtZTtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUubmV4dENsYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvbXBsZXRlZENsYXVzZSA9IHRoaXMuY3VycmVudENsYXVzZTtcbiAgICAgIHRoaXMucXVlcnkuY2xhdXNlKGNvbXBsZXRlZENsYXVzZSk7XG4gICAgICB0aGlzLmN1cnJlbnRDbGF1c2UgPSB7fTtcbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkT3JUZXJtID0gZnVuY3Rpb24ocGFyc2VyKSB7XG4gICAgICB2YXIgbGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKTtcblxuICAgICAgaWYgKGxleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGxleGVtZS50eXBlKSB7XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRmllbGQ7XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAgICAgXCJleHBlY3RlZCBlaXRoZXIgYSBmaWVsZCBvciBhIHRlcm0sIGZvdW5kIFwiICsgbGV4ZW1lLnR5cGU7XG5cbiAgICAgICAgICBpZiAobGV4ZW1lLnN0ci5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IFwiIHdpdGggdmFsdWUgJ1wiICsgbGV4ZW1lLnN0ciArIFwiJ1wiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvcihcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIGxleGVtZS5zdGFydCxcbiAgICAgICAgICAgIGxleGVtZS5lbmRcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRmllbGQgPSBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgIHZhciBsZXhlbWUgPSBwYXJzZXIuY29uc3VtZUxleGVtZSgpO1xuXG4gICAgICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJzZXIucXVlcnkuYWxsRmllbGRzLmluZGV4T2YobGV4ZW1lLnN0cikgPT0gLTEpIHtcbiAgICAgICAgdmFyIHBvc3NpYmxlRmllbGRzID0gcGFyc2VyLnF1ZXJ5LmFsbEZpZWxkc1xuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihmKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIidcIiArIGYgKyBcIidcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIiwgXCIpLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSA9XG4gICAgICAgICAgICBcInVucmVjb2duaXNlZCBmaWVsZCAnXCIgK1xuICAgICAgICAgICAgbGV4ZW1lLnN0ciArXG4gICAgICAgICAgICBcIicsIHBvc3NpYmxlIGZpZWxkczogXCIgK1xuICAgICAgICAgICAgcG9zc2libGVGaWVsZHM7XG5cbiAgICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKTtcbiAgICAgIH1cblxuICAgICAgcGFyc2VyLmN1cnJlbnRDbGF1c2UuZmllbGRzID0gW2xleGVtZS5zdHJdO1xuXG4gICAgICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKCk7XG5cbiAgICAgIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgbm90aGluZ1wiO1xuICAgICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKG5leHRMZXhlbWUudHlwZSkge1xuICAgICAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCI7XG4gICAgICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yKFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgbmV4dExleGVtZS5zdGFydCxcbiAgICAgICAgICAgIG5leHRMZXhlbWUuZW5kXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm0gPSBmdW5jdGlvbihwYXJzZXIpIHtcbiAgICAgIHZhciBsZXhlbWUgPSBwYXJzZXIuY29uc3VtZUxleGVtZSgpO1xuXG4gICAgICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhcnNlci5jdXJyZW50Q2xhdXNlLnRlcm0gPSBsZXhlbWUuc3RyLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChsZXhlbWUuc3RyLmluZGV4T2YoXCIqXCIpICE9IC0xKSB7XG4gICAgICAgIHBhcnNlci5jdXJyZW50Q2xhdXNlLnVzZVBpcGVsaW5lID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKTtcblxuICAgICAgaWYgKG5leHRMZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgICAgICBwYXJzZXIubmV4dENsYXVzZSgpO1xuICAgICAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybTtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKTtcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkO1xuICAgICAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5FRElUX0RJU1RBTkNFOlxuICAgICAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlO1xuICAgICAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5CT09TVDpcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgbGV4ZW1lIHR5cGUgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCI7XG4gICAgICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yKFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgbmV4dExleGVtZS5zdGFydCxcbiAgICAgICAgICAgIG5leHRMZXhlbWUuZW5kXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZSA9IGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKCk7XG5cbiAgICAgIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGVkaXREaXN0YW5jZSA9IHBhcnNlSW50KGxleGVtZS5zdHIsIDEwKTtcblxuICAgICAgaWYgKGlzTmFOKGVkaXREaXN0YW5jZSkpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiZWRpdCBkaXN0YW5jZSBtdXN0IGJlIG51bWVyaWNcIjtcbiAgICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKTtcbiAgICAgIH1cblxuICAgICAgcGFyc2VyLmN1cnJlbnRDbGF1c2UuZWRpdERpc3RhbmNlID0gZWRpdERpc3RhbmNlO1xuXG4gICAgICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKCk7XG5cbiAgICAgIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJzZXIubmV4dENsYXVzZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKTtcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm07XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKCk7XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZDtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZTtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiO1xuICAgICAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvcihcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIG5leHRMZXhlbWUuc3RhcnQsXG4gICAgICAgICAgICBuZXh0TGV4ZW1lLmVuZFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdCA9IGZ1bmN0aW9uKHBhcnNlcikge1xuICAgICAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKCk7XG5cbiAgICAgIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvb3N0ID0gcGFyc2VJbnQobGV4ZW1lLnN0ciwgMTApO1xuXG4gICAgICBpZiAoaXNOYU4oYm9vc3QpKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImJvb3N0IG11c3QgYmUgbnVtZXJpY1wiO1xuICAgICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpO1xuICAgICAgfVxuXG4gICAgICBwYXJzZXIuY3VycmVudENsYXVzZS5ib29zdCA9IGJvb3N0O1xuXG4gICAgICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKCk7XG5cbiAgICAgIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJzZXIubmV4dENsYXVzZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKTtcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm07XG4gICAgICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKCk7XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZDtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZTtcbiAgICAgICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiO1xuICAgICAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvcihcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIG5leHRMZXhlbWUuc3RhcnQsXG4gICAgICAgICAgICBuZXh0TGV4ZW1lLmVuZFxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBsdW5yO1xuICB9KSgpO1xuXG4gIC8vVGhpcyBpcyB0aGUgbWFpbiBwbHVnaW4gZGVmaW5pdGlvblxuICAkLmZuLmdob3N0SHVudGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIC8vSGVyZSB3ZSB1c2UgalF1ZXJ5J3MgZXh0ZW5kIHRvIHNldCBkZWZhdWx0IHZhbHVlcyBpZiB0aGV5IHdlcmVuJ3Qgc2V0IGJ5IHRoZSB1c2VyXG4gICAgdmFyIG9wdHMgPSAkLmV4dGVuZCh7fSwgJC5mbi5naG9zdEh1bnRlci5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgaWYgKG9wdHMucmVzdWx0cykge1xuICAgICAgcGx1Z2luTWV0aG9kcy5pbml0KHRoaXMsIG9wdHMpO1xuICAgICAgcmV0dXJuIHBsdWdpbk1ldGhvZHM7XG4gICAgfVxuICB9O1xuXG4gIC8vIElmIHRoZSBHaG9zdCBpbnN0YW5jZSBpcyBpbiBhIHN1YnBhdGggb2YgdGhlIHNpdGUsIHNldCBzdWJwYXRoXG4gIC8vIGFzIHRoZSBwYXRoIHRvIHRoZSBzaXRlIHdpdGggYSBsZWFkaW5nIHNsYXNoIGFuZCBubyB0cmFpbGluZyBzbGFzaFxuICAvLyAoaS5lLiBcIi9wYXRoL3RvL2luc3RhbmNlXCIpLlxuICAkLmZuLmdob3N0SHVudGVyLmRlZmF1bHRzID0ge1xuICAgIHJlc3VsdHNEYXRhOiBmYWxzZSxcbiAgICBvblBhZ2VMb2FkOiB0cnVlLFxuICAgIG9uS2V5VXA6IGZhbHNlLFxuICAgIHJlc3VsdF90ZW1wbGF0ZTpcbiAgICAgIFwiPGEgaHJlZj0ne3tsaW5rfX0nPjxwPjxoMj57e3RpdGxlfX08L2gyPjxoND57e3ByZXR0eVB1YkRhdGV9fTwvaDQ+PC9wPjwvYT5cIixcbiAgICBpbmZvX3RlbXBsYXRlOiBcIjxwPk51bWJlciBvZiBwb3N0cyBmb3VuZDoge3thbW91bnR9fTwvcD5cIixcbiAgICBkaXNwbGF5U2VhcmNoSW5mbzogdHJ1ZSxcbiAgICB6ZXJvUmVzdWx0c0luZm86IHRydWUsXG4gICAgYmVmb3JlOiBmYWxzZSxcbiAgICBvbkNvbXBsZXRlOiBmYWxzZSxcbiAgICBpbmNsdWRlcGFnZXM6IGZhbHNlLFxuICAgIGZpbHRlcmZpZWxkczogZmFsc2UsXG4gICAgc3VicGF0aDogXCJcIixcbiAgICBpdGVtX3ByZXByb2Nlc3NvcjogZmFsc2UsXG4gICAgaW5kZXhpbmdfc3RhcnQ6IGZhbHNlLFxuICAgIGluZGV4aW5nX2VuZDogZmFsc2VcbiAgfTtcbiAgdmFyIHByZXR0eURhdGUgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICB2YXIgbW9udGhOYW1lcyA9IFtcbiAgICAgIFwiSmFudWFyeVwiLFxuICAgICAgXCJGZWJydWFyeVwiLFxuICAgICAgXCJNYXJjaFwiLFxuICAgICAgXCJBcHJpbFwiLFxuICAgICAgXCJNYXlcIixcbiAgICAgIFwiSnVuZVwiLFxuICAgICAgXCJKdWx5XCIsXG4gICAgICBcIkF1Z3VzdFwiLFxuICAgICAgXCJTZXB0ZW1iZXJcIixcbiAgICAgIFwiT2N0b2JlclwiLFxuICAgICAgXCJOb3ZlbWJlclwiLFxuICAgICAgXCJEZWNlbWJlclwiXG4gICAgXTtcbiAgICByZXR1cm4gZC5nZXREYXRlKCkgKyBcIiBcIiArIG1vbnRoTmFtZXNbZC5nZXRNb250aCgpXSArIFwiIFwiICsgZC5nZXRGdWxsWWVhcigpO1xuICB9O1xuXG4gIHZhciBnZXRTdWJwYXRoS2V5ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFwvLywgXCJcIikucmVwbGFjZSgvXFwvL2csIFwiLVwiKTtcbiAgfTtcblxuICB2YXIgZ3JhYkFuZEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaW5kZXhpbmdfc3RhcnQpIHtcbiAgICAgIHRoaXMuaW5kZXhpbmdfc3RhcnQoKTtcbiAgICB9XG4gICAgdGhpcy5ibG9nRGF0YSA9IHt9O1xuICAgIHRoaXMubGF0ZXN0UG9zdCA9IDA7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIGxpbWl0OiBcImFsbFwiLFxuICAgICAgaW5jbHVkZTogXCJ0YWdzXCIsXG4gICAgICBmb3JtYXRzOiBbXCJwbGFpbnRleHRcIl1cbiAgICB9O1xuICAgIGlmICh0aGlzLmluY2x1ZGVwYWdlcykge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IFwiKHBhZ2U6dHJ1ZSxwYWdlOmZhbHNlKVwiO1xuICAgIH1cbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgICQuZ2V0KGdob3N0LnVybC5hcGkoXCJwb3N0c1wiLCBwYXJhbXMpKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBpZHhTcmMgPSBkYXRhLnBvc3RzO1xuICAgICAgY29uc29sZS5sb2coXCJnaG9zdEh1bnRlcjogaW5kZXhpbmcgYWxsIHBvc3RzXCIpO1xuICAgICAgbWUuaW5kZXggPSBsdW5yKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmZpZWxkKFwidGl0bGVcIiwgeyBib29zdDogMTAgfSk7XG4gICAgICAgIHRoaXMuZmllbGQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICAgICAgdGhpcy5maWVsZChcInBsYWludGV4dFwiLCB7IGJvb3N0OiA1IH0pO1xuICAgICAgICB0aGlzLmZpZWxkKFwicHViRGF0ZVwiKTtcbiAgICAgICAgdGhpcy5maWVsZChcInRhZ1wiKTtcbiAgICAgICAgdGhpcy5yZWYoXCJpZFwiKTtcbiAgICAgICAgaWR4U3JjLmZvckVhY2goZnVuY3Rpb24oYXJyYXlJdGVtKSB7XG4gICAgICAgICAgLy8gVHJhY2sgdGhlIGxhdGVzdCB2YWx1ZSBvZiB1cGRhdGVkX2F0LCAgdG8gc3Rhc2ggaW4gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgdmFyIGl0ZW1EYXRlID0gbmV3IERhdGUoYXJyYXlJdGVtLnVwZGF0ZWRfYXQpLmdldFRpbWUoKTtcbiAgICAgICAgICB2YXIgcmVjb3JkZWREYXRlID0gbmV3IERhdGUobWUubGF0ZXN0UG9zdCkuZ2V0VGltZSgpO1xuICAgICAgICAgIGlmIChpdGVtRGF0ZSA+IHJlY29yZGVkRGF0ZSkge1xuICAgICAgICAgICAgbWUubGF0ZXN0UG9zdCA9IGFycmF5SXRlbS51cGRhdGVkX2F0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdGFnX2FyciA9IGFycmF5SXRlbS50YWdzLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICByZXR1cm4gdi5uYW1lOyAvLyBgdGFnYCBvYmplY3QgaGFzIGFuIGBuYW1lYCBwcm9wZXJ0eSB3aGljaCBpcyB0aGUgdmFsdWUgb2YgdGFnLiBJZiB5b3UgYWxzbyB3YW50IG90aGVyIGluZm8sIGNoZWNrIEFQSSBhbmQgZ2V0IHRoYXQgcHJvcGVydHlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoYXJyYXlJdGVtLm1ldGFfZGVzY3JpcHRpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXlJdGVtLm1ldGFfZGVzY3JpcHRpb24gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2F0ZWdvcnkgPSB0YWdfYXJyLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICBpZiAoY2F0ZWdvcnkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY2F0ZWdvcnkgPSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBTdHJpbmcoYXJyYXlJdGVtLmlkKSxcbiAgICAgICAgICAgIHRpdGxlOiBTdHJpbmcoYXJyYXlJdGVtLnRpdGxlKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoYXJyYXlJdGVtLm1ldGFfZGVzY3JpcHRpb24pLFxuICAgICAgICAgICAgcGxhaW50ZXh0OiBTdHJpbmcoYXJyYXlJdGVtLnBsYWludGV4dCksXG4gICAgICAgICAgICBwdWJEYXRlOiBTdHJpbmcoYXJyYXlJdGVtLnB1Ymxpc2hlZF9hdCksXG4gICAgICAgICAgICB0YWc6IGNhdGVnb3J5XG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmFkZChwYXJzZWREYXRhKTtcbiAgICAgICAgICB2YXIgbG9jYWxVcmwgPSBtZS5zdWJwYXRoICsgYXJyYXlJdGVtLnVybDtcbiAgICAgICAgICBtZS5ibG9nRGF0YVthcnJheUl0ZW0uaWRdID0ge1xuICAgICAgICAgICAgdGl0bGU6IGFycmF5SXRlbS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBhcnJheUl0ZW0ubWV0YV9kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHB1YkRhdGU6IHByZXR0eURhdGUocGFyc2VkRGF0YS5wdWJEYXRlKSxcbiAgICAgICAgICAgIGxpbms6IGxvY2FsVXJsLFxuICAgICAgICAgICAgdGFnczogdGFnX2FyclxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBtZXRhZGF0YSBcInByZVwiLXByb2Nlc3NvciBmb3IgdGhlIGl0ZW0sIHJ1biBpdCBoZXJlLlxuICAgICAgICAgIGlmIChtZS5pdGVtX3ByZXByb2Nlc3Nvcikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgbWUuYmxvZ0RhdGFbYXJyYXlJdGVtLmlkXSxcbiAgICAgICAgICAgICAgbWUuaXRlbV9wcmVwcm9jZXNzb3IoYXJyYXlJdGVtKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBpZiAobWUuaW5kZXhpbmdfZW5kKSB7XG4gICAgICAgICAgbWUuaW5kZXhpbmdfZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHN1YnBhdGhLZXkgPSBnZXRTdWJwYXRoS2V5KG1lLnN1YnBhdGgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICBcImdob3N0X1wiICsgc3VicGF0aEtleSArIFwiX2x1bnJJbmRleFwiLFxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KG1lLmluZGV4KVxuICAgICAgICApO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICBcImdob3N0X1wiICsgc3VicGF0aEtleSArIFwiX2Jsb2dEYXRhXCIsXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkobWUuYmxvZ0RhdGEpXG4gICAgICAgICk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgIFwiZ2hvc3RfXCIgKyBzdWJwYXRoS2V5ICsgXCJfbGF0ZXN0UG9zdFwiLFxuICAgICAgICAgIG1lLmxhdGVzdFBvc3RcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiZ2hvc3RIdW50ZXI6IHNhdmUgdG8gbG9jYWxTdG9yYWdlIGZhaWxlZDogXCIgKyBlKTtcbiAgICAgIH1cbiAgICAgIG1lLmlzSW5pdCA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIHBsdWdpbk1ldGhvZHMgPSB7XG4gICAgaXNJbml0OiBmYWxzZSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHRhcmdldCwgb3B0cykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKTtcblxuICAgICAgaWYgKG9wdHMub25QYWdlTG9hZCkge1xuICAgICAgICBmdW5jdGlvbiBtaWFtKCkge1xuICAgICAgICAgIHRoYXQubG9hZEFQSSgpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KG1pYW0sIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LmZvY3VzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQubG9hZEFQSSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCJmb3JtXCIpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5maW5kKHRhcmdldC52YWwoKSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdHMub25LZXlVcCkge1xuICAgICAgICB0YXJnZXQua2V5dXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5maW5kKHRhcmdldC52YWwoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBsb2FkQVBJOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5pc0luaXQpIHtcbiAgICAgICAgLy8gSWYgaXNJbml0IGlzIGZhbHN5LCBjaGVjayBmb3IgZGF0YSBpbiBsb2NhbFN0b3JlLFxuICAgICAgICAvLyBwYXJzZSBpbnRvIG1lbW9yeSwgYW5kIGRlY2xhcmUgaXNJbml0IHRvIGJlIHRydWUuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHN1YnBhdGhLZXkgPSBnZXRTdWJwYXRoS2V5KHRoaXMuc3VicGF0aCk7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICAgICAgXCJnaG9zdF9cIiArIHN1YnBhdGhLZXkgKyBcIl9sdW5ySW5kZXhcIlxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5ibG9nRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFxuICAgICAgICAgICAgXCJnaG9zdF9cIiArIHN1YnBhdGhLZXkgKyBcIl9ibG9nRGF0YVwiXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmxhdGVzdFBvc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgICAgICAgIFwiZ2hvc3RfXCIgKyBzdWJwYXRoS2V5ICsgXCJfbGF0ZXN0UG9zdFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodGhpcy5sYXRlc3RQb3N0ICYmIHRoaXMuaW5kZXggJiYgdGhpcy5ibG9nRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sYXRlc3RQb3N0ID0gdGhpcy5sYXRlc3RQb3N0O1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGx1bnIuSW5kZXgubG9hZChKU09OLnBhcnNlKHRoaXMuaW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMuYmxvZ0RhdGEgPSBKU09OLnBhcnNlKHRoaXMuYmxvZ0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcImdob3N0SHVudGVyOiByZXRyaWV2ZSBmcm9tIGxvY2FsU3RvcmFnZSBmYWlsZWQ6IFwiICsgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBhcmUgbmV3IG9yIGVkaXRlZCBwb3N0c1xuICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgIGxpbWl0OiBcImFsbFwiLFxuICAgICAgICAgIGZpbHRlcjogXCJ1cGRhdGVkX2F0Oj4nXCIgKyB0aGlzLmxhdGVzdFBvc3QgKyBcIidcIixcbiAgICAgICAgICBmaWVsZHM6IFwiaWRcIlxuICAgICAgICB9O1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICAkLmdldChnaG9zdC51cmwuYXBpKFwicG9zdHNcIiwgcGFyYW1zKSkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgaWYgKGRhdGEucG9zdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZ3JhYkFuZEluZGV4LmNhbGwobWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpc0luaXQgaXMgc3RpbGwgZmFsc2UuXG4gICAgICAgIGdyYWJBbmRJbmRleC5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5kOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIHNlYXJjaFJlc3VsdCA9IHRoaXMuaW5kZXguc2VhcmNoKHZhbHVlKTtcbiAgICAgIHZhciByZXN1bHRzID0gJCh0aGlzLnJlc3VsdHMpO1xuICAgICAgdmFyIHJlc3VsdHNEYXRhID0gW107XG4gICAgICByZXN1bHRzLmVtcHR5KCk7XG5cbiAgICAgIGlmICh0aGlzLmJlZm9yZSkge1xuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy56ZXJvUmVzdWx0c0luZm8gfHwgc2VhcmNoUmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheVNlYXJjaEluZm8pXG4gICAgICAgICAgcmVzdWx0cy5hcHBlbmQoXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCh0aGlzLmluZm9fdGVtcGxhdGUsIHsgYW1vdW50OiBzZWFyY2hSZXN1bHQubGVuZ3RoIH0pXG4gICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hSZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGx1bnJyZWYgPSBzZWFyY2hSZXN1bHRbaV0ucmVmO1xuICAgICAgICB2YXIgcG9zdERhdGEgPSB0aGlzLmJsb2dEYXRhW2x1bnJyZWZdO1xuICAgICAgICBcbiAgICAgICAgaWYgKHBvc3REYXRhKSB7XG4gICAgICAgICAgcmVzdWx0cy5hcHBlbmQodGhpcy5mb3JtYXQodGhpcy5yZXN1bHRfdGVtcGxhdGUsIHsuLi5wb3N0RGF0YSwgaWQ6IGx1bnJyZWZ9KSk7XG4gICAgICAgICAgcmVzdWx0c0RhdGEucHVzaChwb3N0RGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiZ2hvc3RIdW50ZXI6IGluZGV4L2RhdGEgbWlzbWF0Y2guIE91Y2guXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9uQ29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlKHJlc3VsdHNEYXRhKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLnJlc3VsdHMpLmVtcHR5KCk7XG4gICAgICB0aGlzLnRhcmdldC52YWwoXCJcIik7XG4gICAgfSxcblxuICAgIGZvcm1hdDogZnVuY3Rpb24odCwgZCkge1xuICAgICAgcmV0dXJuIHQucmVwbGFjZSgve3soW157fV0qKX19L2csIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgdmFyIHIgPSBkW2JdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIHIgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHIgPT09IFwibnVtYmVyXCIgPyByIDogYTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanF1ZXJ5Lmdob3N0aHVudGVyLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BhcnRpYWxzL3NpZGUtYmFyLWJvZHkvc2VhcmNoLWJveC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9