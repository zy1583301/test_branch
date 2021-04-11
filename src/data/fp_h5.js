if (!Array.prototype.filter) {
  Array.prototype.filter = function(func, thisArg) {
    if (!((typeof func === "Function" || typeof func === "function") && this)) {
      throw new TypeError();
    }
    var len = this.length >>> 0,
      res = new Array(len),
      t = this,
      c = 0,
      i = -1;
    if (thisArg === undefined) {
      while (++i !== len) {
        if (i in this) {
          if (func(t[i], i, t)) {
            res[c++] = t[i];
          } else {
            while (++i !== len) {
              if (i in this) {
                if (func.call(thisArg, t[i], i, t)) {
                  res[c++] = t[i];
                }
              }
            }
          }
        }
      }
    }
    res.length = c;
    return res;
  };
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function indexOf(member, startFrom) {
    if (this == null) {
      throw new TypeError(
        "Array.prototype.indexOf() - can't convert `" + this + "` to object"
      );
    }
    var index = isFinite(startFrom) ? Math.floor(startFrom) : 0,
      that = this instanceof Object ? this : new Object(this),
      length = isFinite(that.length) ? Math.floor(that.length) : 0;
    if (index >= length) {
      return -1;
    }
    if (index < 0) {
      index = Math.max(length + index, 0);
    }
    if (member === undefined) {
      do {
        if (index in that && that[index] === undefined) {
          return index;
        }
      } while (++index < length);
    } else {
      do {
        if (that[index] === member) {
          return index;
        }
      } while (++index < length);
    }
    return -1;
  };
}
if (typeof Object.assign != "function") {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
(function(name, context, definition) {
  if (typeof window.define === "function" && window.define.amd) {
    window.define(definition);
  } else {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = definition();
    } else {
      if (context.exports) {
        context.exports = definition();
      } else {
        context[name] = definition();
      }
    }
  }
})("BxH5DevicePrint", this, function() {
  class BxH5DevicePrint {
    constructor(options) {
      if (!(this instanceof BxH5DevicePrint)) {
        return new BxH5DevicePrint(options);
      }
      var defaultOptions = {
        swfContainerId: "BxH5DevicePrintjs",
        swfPath: "flash/compiled/FontList.swf",
        detectScreenOrientation: true,
        sortPluginsFor: [/palemoon/i],
        userDefinedFonts: [],
        timeout: 10000,
        excludeDoNotTrack: false,
        isIntercept: false,
        rule:{
          webgl: 7000,
          userAgent: 120
        }
      };
      this.options = this.extend(options, defaultOptions);
      this.meta = [];
      this.nativeForEach = Array.prototype.forEach;
      this.nativeMap = Array.prototype.map;
      this.url = options.url;
      this.systemNumber = options.systemNumber;
      this.serNum1 = options.serNum1 || "";
      this.serNum2 = options.serNum2 || "";
      this.serNum3 = options.serNum3 || "";
      this.serialNumber1 = options.serialNumber1 || "";
      this.serialNumber2 = options.serialNumber2 || "";
      this.serialNumber3 = options.serialNumber3 || "";
      this.version = options.version || "";
      this.applyId = options.applyId || "";
      this.accelero = [null, null, null];
      this.gyroscope = [null, null, null];
      this.idMark = null;
      this.timeMark = null;
      this.mark = null;
      this.myDB_time = {
        name: 'startTime',
        version: 1,
        db: null,
        ojstore: {
          name: 'startTime',
          keypath: 'id' //主键
        },
        result: null,
        markName: 'timeMark'
      };
      this.myDB_uuid = {
        name: 'uuid',
        version: 1,
        db: null,
        ojstore: {
          name: 'uuid',
          keypath: 'id' //主键
        },
        result: null,
        markName: 'idMark'
      };
      this.indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
      this.isPrivate = false;
      this.startTime = false;
      this.uuid = false;
      this.storageCode = "";
      this.init();
    }
    isPrivateMode(done) {
      var on = function() {
        return (done || function() {})(true);
      };
      var off = function() {
        return (done || function() {})(false);
      };
      var testLocalStorage = function() {
        try {
          if (localStorage.length) {
            off();
          } else {
            localStorage.x = 1;
            localStorage.removeItem("x");
            off();
          }
        } catch (e) {
          navigator.cookieEnabled ? on() : off();
        }
      };
      if (window.webkitRequestFileSystem) {
        return void window.webkitRequestFileSystem(0, 0, off, on);
      }
      if ("MozAppearance" in document.documentElement.style) {
        var db = indexedDB.open("test");
        db.onerror = on;
        db.onsuccess = off;
        return void 0;
      }
      if (/constructor/i.test(window.HTMLElement)) {
        return testLocalStorage();
      }
      if (!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)) {
        return on();
      }
      return off();
    }
    extend(source, target) {
      if (source == null) {
        return target;
      }
      for (var k in source) {
        if (source[k] != null && target[k] !== source[k]) {
          target[k] = source[k];
        }
      }
      return target;
    }
    orientationHandler(event) {
      this.accelero[0] = event.alpha;
      this.accelero[1] = event.beta;
      this.accelero[2] = event.gamma;
    }
    motionHandler(event) {
      var acc = event.acceleration;
      this.gyroscope[0] = acc.x;
      this.gyroscope[1] = acc.y;
      this.gyroscope[2] = acc.z;
    }
    init() {
      var orientationHandlerEvent = this.orientationHandler.bind(this);
      window.addEventListener("deviceorientation", orientationHandlerEvent);
      setTimeout(function() {
        window.removeEventListener(
          "deviceorientation",
          orientationHandlerEvent
        );
      }, 1024);
      var motionHandlerEvent = this.motionHandler.bind(this);
      window.addEventListener("devicemotion", motionHandlerEvent);
      setTimeout(function() {
        window.removeEventListener("devicemotion", motionHandlerEvent);
      }, 1024);
    }
    getTraceId(done) {
      let that = this;
      this.isPrivateMode((isPrivate)=>{
        that.isPrivate = isPrivate;
        if(!that.isPrivate) {
          that.openDB(that.myDB_time, 1);
          that.openDB(that.myDB_uuid, 1);
          const DbInterval = setInterval(() => {
            if (that.uuid && that.startTime) {
              that.seqProcess(isPrivate, done);
              clearInterval(DbInterval);
            }
          }, 50)
        } else {
          that.seqProcess(isPrivate, done);
        }
      })
    }
    seqProcess(isPrivate, done) {
      this.check('myDB_time', isPrivate);
      this.check('myDB_uuid', isPrivate);
      this.setMark();
      this.get(done);
    }
    get(done) {
      var that = this;
      var keys = {
        data: [],
        addPreprocessedComponent: function(pair) {
          var componentValue = pair.value;
          keys.data.push({
            key: pair.key,
            value: componentValue,
            desc: pair.desc
          });
        }
      };
      keys = this.userAgentKey(keys);
      keys = this.languageKey(keys);
      keys = this.colorDepthKey(keys);
      keys = this.deviceMemoryKey(keys);
      keys = this.pixelRatioKey(keys);
      keys = this.hardwareConcurrencyKey(keys);
      keys = this.screenResolutionKey(keys);
      keys = this.availableScreenResolutionKey(keys);
      keys = this.timezoneOffsetKey(keys);
      keys = this.sessionStorageKey(keys);
      keys = this.localStorageKey(keys);
      keys = this.indexedDbKey(keys);
      keys = this.addBehaviorKey(keys);
      keys = this.openDatabaseKey(keys);
      keys = this.cpuClassKey(keys);
      keys = this.platformKey(keys);
      keys = this.doNotTrackKey(keys);
      keys = this.pluginsKey(keys);
      keys = this.canvasKey(keys);
      keys = this.webglKey(keys);
      keys = this.webglVendorAndRendererKey(keys);
      keys = this.adBlockKey(keys);
      keys = this.hasLiedLanguagesKey(keys);
      keys = this.hasLiedResolutionKey(keys);
      keys = this.hasLiedOsKey(keys);
      keys = this.hasLiedBrowserKey(keys);
      keys = this.touchSupportKey(keys);
      keys = this.customEntropyFunction(keys);
      keys = this.setDeviceKey(keys);
      this.requestIdleProcess(function() {
        that.fontsKey(keys, function(newKeys) {
            newKeys = that.additionalItems(newKeys, that.isPrivate);
            newKeys = that.getWebglObj(newKeys);
            newKeys = that.getBrowserInfo(newKeys);
            newKeys = that.getVerification(newKeys);
            newKeys = that.handleValue(newKeys);
            const pushData = {
              data: newKeys.data,
              systemNumber: that.systemNumber,
              meta: that.meta,
            }
            let str = JSON.stringify(pushData);
            return that.ajax(done, str, that.url);
        });
      });
    }
    requestIdleProcess(fn) {
      if (window.requestIdleCallback) {
        return window.requestIdleCallback(fn);
      } else {
        return setTimeout(fn, 1);
      }
    }
    getVerification(keys) {
      // this.traceId = this.uuid_product();
      keys = this.arrAddItems(
        keys,
        "前端存储对比标识",
        this.mark,
        "safeMark"
      );
      keys = this.arrAddItems(
        keys,
        "cookie, localStorage, indexedDB综合储存值, 清除前端储存之后就会改变",
        this.storageCode,
        "storageCode"
      );
      // keys = this.arrAddItems(
      //   keys,
      //   "查询码",
      //   "H5|" + this.traceId,
      //   "traceId"
      // );
      return keys;
    }
    checkVideo() {
      if (document.createElement("video").canPlayType) {
        var vidTest = document.createElement("video");
        var oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
        if (!oggTest) {
          var h264Test = vidTest.canPlayType(
            'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          );
          if (!h264Test) {
            return false;
          } else {
            if (h264Test == "probably") {
              return true;
            } else {
              return false;
            }
          }
        } else {
          if (oggTest == "probably") {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    getBrowserInfo(keys) {
      keys = this.arrAddItems(
        keys,
        "浏览器的编译版本号",
        navigator.productSub || "",
        "productSub"
      );
      keys = this.arrAddItems(
        keys,
        "浏览器代号",
        navigator.appCodeName || "",
        "appCodeName"
      );
      keys = this.arrAddItems(
        keys,
        "浏览器操作系统",
        navigator.platform || "",
        "platform"
      );
      keys = this.arrAddItems(
        keys,
        "多用途互联网邮件扩展数量",
        navigator.mimeTypes.length || 0,
        "mimeCnt"
      );
      keys = this.arrAddItems(
        keys,
        "多用途互联网邮件扩展",
        this.GetMimeTypes() || "",
        "mimeTypes"
      );
      keys = this.arrAddItems(
        keys,
        "请求头信息",
        this.getHeaderParams() || "",
        "headers"
      );
      keys = this.arrAddItems(
        keys,
        "是否可以加载视频",
        this.checkVideo() || 0,
        "isLoadVedio"
      );
      keys = this.arrAddItems(keys, "是否可以加载图片", 1, "isLoadImg");
      keys = this.arrAddItems(
        keys,
        "网页地址",
        window.location.href || "",
        "reqUrl"
      );
      keys = this.arrAddItems(
        keys,
        "浏览器的平台和版本信息",
        navigator.appVersion.replace(/(\swebCore=\w*)/,"") || "",
        "browserVer"
      );
      keys = this.arrAddItems(
        keys,
        "浏览器的次要版本",
        navigator.appMinorVersion || "",
        "appMinorVersion"
      );
      var systemLang = navigator.languages ? navigator.languages.join(",") : "";
      keys = this.arrAddItems(keys, "浏览器语言", systemLang, "systemLang");
      keys = this.arrAddItems(
        keys,
        "浏览器是否联网",
        navigator.onLine ? 1 : 0,
        "isOnline"
      );
      keys = this.arrAddItems(
        keys,
        "浏览器是否支持cookie",
        navigator.cookieEnabled ? 1 : 0,
        "isCookie"
      );
      return keys;
    }
    arrAddItems(keys, desc, value, key) {
      keys.addPreprocessedComponent({
        key: key,
        value: value,
        desc: desc
      });
      return keys;
    }
    getHeaderParams() {
      try {
        var req = new XMLHttpRequest();
        req.open("GET", document.location, false);
        req.send(null);
        return req
          .getAllResponseHeaders()
          .toLowerCase()
          .replace(/\n/g, ";");
      } catch (e) {
        return "";
      }
    }
    customEntropyFunction(keys) {
      if (typeof this.options.customFunction === "function") {
        keys.addPreprocessedComponent({
          key: "custom",
          value: this.options.customFunction()
        });
      }
      return keys;
    }
    setDeviceKey(keys) {
      if (!this.options.customDevice) {
        keys.addPreprocessedComponent({
          key: "maxTouchPoints",
          desc: "多点触控数量",
          value: navigator.maxTouchPoints || 0
        });
        keys.addPreprocessedComponent({
          key: "hardwareConcurrency",
          desc: "cpu数量",
          value: navigator.hardwareConcurrency || 0
        });
        keys.addPreprocessedComponent({
          key: "isCpu32",
          desc: "浏览器的操作系统是否为32位",
          value: navigator.platform.indexOf('32') >= 0 ? 1 : 0
        });
        keys.addPreprocessedComponent({
          key: "isCpu64",
          desc: "浏览器的操作系统是否为64位",
          value: navigator.platform.indexOf('64') >= 0 ? 1 : 0
        });
        keys.addPreprocessedComponent({
          key: "product",
          desc: "浏览器引擎",
          value: navigator.product || ""
        });
        keys.addPreprocessedComponent({
          key: "vender",
          desc: "浏览器厂商",
          value: navigator.vendor || ""
        });
      }
      return keys;
    }
    GetMimeTypes() {
      var message = [];
      if (navigator.mimeTypes && navigator.mimeTypes.length > 0) {
        var mimes = navigator.mimeTypes;
        for (var i = 0; i < mimes.length; i++) {
          message.push(mimes[i].type);
        }
      }
      return message.join(",");
    }
    additionalItems(keys, isPrivate) {
      keys = this.arrAddItems(
        keys,
        "系统编号",
        this.systemNumber,
        "systemNumber"
      );
      keys = this.arrAddItems(keys, "系列号1", this.serNum1, "serNum1");
      keys = this.arrAddItems(keys, "系列号2", this.serNum2, "serNum2");
      keys = this.arrAddItems(keys, "系列号3", this.serNum3, "serNum3");
      keys = this.arrAddItems(keys, "系列号1-1", this.serialNumber1, "serialNumber1");
      keys = this.arrAddItems(keys, "系列号2-1", this.serialNumber2, "serialNumber2");
      keys = this.arrAddItems(keys, "系列号3-1", this.serialNumber3, "serialNumber3");
      keys = this.arrAddItems(keys, "业务系统", this.version, "version");
      keys = this.arrAddItems(keys, "业务申请ID", this.applyId, "applyId");
      keys = this.arrAddItems(
        keys,
        "是否为隐私模式",
        isPrivate ? 1 : 0,
        "privacy"
      );
      keys = this.arrAddItems(
        keys,
        "初次调用时间戳",
        new Date().getTime(),
        "callTs"
      );
      keys = this.arrAddItems(
        keys,
        "设备绕X轴旋转的角度值",
        this.accelero[1],
        "acceleroX"
      );
      keys = this.arrAddItems(
        keys,
        "设备绕Y轴旋转的角度值",
        this.accelero[2],
        "acceleroY"
      );
      keys = this.arrAddItems(
        keys,
        "设备绕Z轴旋转的角度值",
        this.accelero[0],
        "acceleroZ"
      );
      keys = this.arrAddItems(
        keys,
        "设备在X轴方向的晃动值",
        this.gyroscope[0],
        "gyroscopeX"
      );
      keys = this.arrAddItems(
        keys,
        "设备在Y轴方向的晃动值",
        this.gyroscope[1],
        "gyroscopeY"
      );
      keys = this.arrAddItems(
        keys,
        "设备在Z轴方向的晃动值",
        this.gyroscope[2],
        "gyroscopeZ"
      );
      return keys;
    }
    userAgentKey(keys) {
      if (!this.options.excludeUserAgent) {
        keys.addPreprocessedComponent({
          key: "userAgent",
          value: this.getUserAgent().replace(/(\swebCore=\w*)/,""),
          desc: "用户代理"
        });
      }
      return keys;
    }
    getUserAgent() {
      return navigator.userAgent;
    }
    languageKey(keys) {
      if (!this.options.excludeLanguage) {
        keys.addPreprocessedComponent({
          key: "language",
          desc: "浏览器语言",
          value:
            navigator.language ||
            navigator.userLanguage ||
            navigator.browserLanguage ||
            navigator.systemLanguage ||
            ""
        });
      }
      return keys;
    }
    colorDepthKey(keys) {
      if (!this.options.excludeColorDepth) {
        keys.addPreprocessedComponent({
          key: "colorDepth",
          desc: "色深",
          value: window.screen.colorDepth || -1
        });
      }
      return keys;
    }
    deviceMemoryKey(keys) {
      if (!this.options.excludeDeviceMemory) {
        keys.addPreprocessedComponent({
          key: "devMemory",
          desc: "设备内存",
          value: this.getDeviceMemory()
        });
      }
      return keys;
    }
    getDeviceMemory() {
      return navigator.deviceMemory || -1;
    }
    pixelRatioKey(keys) {
      if (!this.options.excludePixelRatio) {
        keys.addPreprocessedComponent({
          key: "pixelRatio",
          desc: "设备像素比",
          value: this.getPixelRatio()
        });
      }
      return keys;
    }
    getPixelRatio() {
      return window.devicePixelRatio || 1;
    }
    screenResolutionKey(keys) {
      if (!this.options.excludeScreenResolution) {
        return this.getScreenResolution(keys);
      }
      return keys;
    }
    getScreenResolution(keys) {
      var resolution;
      if (this.options.detectScreenOrientation) {
        resolution =
          window.screen.height > window.screen.width
            ? [window.screen.height, window.screen.width]
            : [window.screen.width, window.screen.height];
      } else {
        resolution = [window.screen.width, window.screen.height];
      }
      keys.addPreprocessedComponent({
        key: "resolution",
        desc: "屏幕像素",
        value: resolution.join(",")
      });
      return keys;
    }
    availableScreenResolutionKey(keys) {
      if (!this.options.excludeAvailableScreenResolution) {
        return this.getAvailableScreenResolution(keys);
      }
      return keys;
    }
    getAvailableScreenResolution(keys) {
      var available;
      if (window.screen.availWidth && window.screen.availHeight) {
        if (this.options.detectScreenOrientation) {
          available =
            window.screen.availHeight > window.screen.availWidth
              ? [window.screen.availHeight, window.screen.availWidth]
              : [window.screen.availWidth, window.screen.availHeight];
        } else {
          available = [window.screen.availHeight, window.screen.availWidth];
        }
      }
      if (typeof available !== "undefined") {
        keys.addPreprocessedComponent({
          key: "avlResolution",
          desc: "屏幕可用像素",
          value: available.join(",")
        });
      }
      return keys;
    }
    timezoneOffsetKey(keys) {
      if (!this.options.excludeTimezoneOffset) {
        keys.addPreprocessedComponent({
          key: "timezoneOffset",
          desc: "时区偏移",
          value: new Date().getTimezoneOffset()
        });
      }
      return keys;
    }
    sessionStorageKey(keys) {
      if (!this.options.excludeSessionStorage && this.hasSessionStorage()) {
        keys.addPreprocessedComponent({
          key: "session",
          desc: "sessionStorage是否可用",
          value: 1
        });
      }
      return keys;
    }
    localStorageKey(keys) {
      if (!this.options.excludeSessionStorage && this.hasLocalStorage()) {
        keys.addPreprocessedComponent({
          key: "local",
          desc: "localStorage是否可用",
          value: 1
        });
      }
      return keys;
    }
    indexedDbKey(keys) {
      if (!this.isIE()) {
        if (!this.options.excludeIndexedDB && this.hasIndexedDB()) {
          keys.addPreprocessedComponent({
            key: "indexed",
            desc: "indexedDb是否可用",
            value: 1
          });
        }
      }
      return keys;
    }
    addBehaviorKey(keys) {
      if (
        !this.options.excludeAddBehavior &&
        document.body &&
        document.body.addBehavior
      ) {
        keys.addPreprocessedComponent({
          key: "addBehavior",
          desc: "addBehavior是否可用",
          value: 1
        });
      }
      return keys;
    }
    openDatabaseKey(keys) {
      if (!this.options.excludeOpenDatabase && window.openDatabase) {
        keys.addPreprocessedComponent({
          key: "database",
          desc: "openDatabase是否可用",
          value: 1
        });
      }
      return keys;
    }
    cpuClassKey(keys) {
      if (!this.options.excludeCpuClass) {
        keys.addPreprocessedComponent({
          key: "cpuType",
          desc: "CPU类型",
          value: this.getNavigatorCpuClass()
        });
      }
      return keys;
    }
    platformKey(keys) {
      if (!this.options.excludePlatform) {
        keys.addPreprocessedComponent({
          key: "os",
          desc: "操作系统",
          value: this.getNavigatorPlatform()
        });
      }
      return keys;
    }
    doNotTrackKey(keys) {
      if (!this.options.excludeDoNotTrack) {
        keys.addPreprocessedComponent({
          key: "track",
          desc: "是否禁止追踪",
          value: this.getDoNotTrack()
        });
      }
      return keys;
    }
    canvasKey(keys) {
      if (!this.options.excludeCanvas && this.isCanvasSupported()) {
        keys.addPreprocessedComponent({
          key: "canvas",
          desc: "画布指纹",
          value: this.getCanvasFp()
        });
      }
      return keys;
    }
    webglKey(keys) {
      if (!this.options.excludeWebGL && this.isWebGlSupported()) {
        keys.addPreprocessedComponent({
          key: "webgl",
          desc: "Wbgl信息",
          value: this.getWebglFp()
        });
      }
      return keys;
    }
    webglVendorAndRendererKey(keys) {
      if (
        !this.options.excludeWebGLVendorAndRenderer &&
        this.isWebGlSupported()
      ) {
        keys.addPreprocessedComponent({
          key: "webglVendorAndRenderer",
          desc: "Wbgl供应商和渲染器信息",
          value: this.getWebglVendorAndRenderer()
        });
      }
      return keys;
    }
    adBlockKey(keys) {
      if (!this.options.excludeAdBlock) {
        keys.addPreprocessedComponent({
          key: "adblock",
          desc: "是否使用adblock",
          value: this.getAdBlock()
        });
      }
      return keys;
    }
    hasLiedLanguagesKey(keys) {
      if (!this.options.excludeHasLiedLanguages) {
        keys.addPreprocessedComponent({
          key: "liedLanguage",
          desc: "语言是否欺诈",
          value: this.getHasLiedLanguages()
        });
      }
      return keys;
    }
    hasLiedResolutionKey(keys) {
      if (!this.options.excludeHasLiedResolution) {
        keys.addPreprocessedComponent({
          key: "liedResolution",
          desc: "分辨率是否欺诈",
          value: this.getHasLiedResolution()
        });
      }
      return keys;
    }
    hasLiedOsKey(keys) {
      if (!this.options.excludeHasLiedOs) {
        keys.addPreprocessedComponent({
          key: "liedOs",
          desc: "系统是否欺诈",
          value: this.getHasLiedOs()
        });
      }
      return keys;
    }
    hasLiedBrowserKey(keys) {
      if (!this.options.excludeHasLiedBrowser) {
        keys.addPreprocessedComponent({
          key: "liedBrowser",
          desc: "浏览器是否欺诈",
          value: this.getHasLiedBrowser()
        });
      }
      return keys;
    }
    fontsKey(keys, done) {
      if (this.options.excludeJsFonts) {
        return this.flashFontsKey(keys, done);
      }
      return this.jsFontsKey(keys, done);
    }
    flashFontsKey(keys, done) {
      if (this.options.excludeFlashFonts) {
        return done(keys);
      }
      if (!this.hasSwfObjectLoaded()) {
        return done(keys);
      }
      if (!this.hasMinFlashInstalled()) {
        return done(keys);
      }
      if (typeof this.options.swfPath === "undefined") {
        return done(keys);
      }
      this.loadSwfAndDetectFonts(function(fonts) {
        keys.addPreprocessedComponent({
          key: "fonts",
          desc: "支持的字体列表",
          value: fonts.join(";")
        });
        done(keys);
      });
    }
    jsFontsKey(keys, done) {
      var that = this;
      return setTimeout(function() {
        var baseFonts = ["monospace", "sans-serif", "serif"];
        var fontList = [
          "Andale Mono",
          "Arial",
          "Arial Black",
          "Arial Hebrew",
          "Arial MT",
          "Arial Narrow",
          "Arial Rounded MT Bold",
          "Arial Unicode MS",
          "Bitstream Vera Sans Mono",
          "Book Antiqua",
          "Bookman Old Style",
          "Calibri",
          "Cambria",
          "Cambria Math",
          "Century",
          "Century Gothic",
          "Century Schoolbook",
          "Comic Sans",
          "Comic Sans MS",
          "Consolas",
          "Courier",
          "Courier New",
          "Geneva",
          "Georgia",
          "Helvetica",
          "Helvetica Neue",
          "Impact",
          "Lucida Bright",
          "Lucida Calligraphy",
          "Lucida Console",
          "Lucida Fax",
          "LUCIDA GRANDE",
          "Lucida Handwriting",
          "Lucida Sans",
          "Lucida Sans Typewriter",
          "Lucida Sans Unicode",
          "Microsoft Sans Serif",
          "Monaco",
          "Monotype Corsiva",
          "MS Gothic",
          "MS Outlook",
          "MS PGothic",
          "MS Reference Sans Serif",
          "MS Sans Serif",
          "MS Serif",
          "MYRIAD",
          "MYRIAD PRO",
          "Palatino",
          "Palatino Linotype",
          "Segoe Print",
          "Segoe Script",
          "Segoe UI",
          "Segoe UI Light",
          "Segoe UI Semibold",
          "Segoe UI Symbol",
          "Tahoma",
          "Times",
          "Times New Roman",
          "Times New Roman PS",
          "Trebuchet MS",
          "Verdana",
          "Wingdings",
          "Wingdings 2",
          "Wingdings 3"
        ];
        var extendedFontList = [
          "Abadi MT Condensed Light",
          "Academy Engraved LET",
          "ADOBE CASLON PRO",
          "Adobe Garamond",
          "ADOBE GARAMOND PRO",
          "Agency FB",
          "Aharoni",
          "Albertus Extra Bold",
          "Albertus Medium",
          "Algerian",
          "Amazone BT",
          "American Typewriter",
          "American Typewriter Condensed",
          "AmerType Md BT",
          "Andalus",
          "Angsana New",
          "AngsanaUPC",
          "Antique Olive",
          "Aparajita",
          "Apple Chancery",
          "Apple Color Emoji",
          "Apple SD Gothic Neo",
          "Arabic Typesetting",
          "ARCHER",
          "ARNO PRO",
          "Arrus BT",
          "Aurora Cn BT",
          "AvantGarde Bk BT",
          "AvantGarde Md BT",
          "AVENIR",
          "Ayuthaya",
          "Bandy",
          "Bangla Sangam MN",
          "Bank Gothic",
          "BankGothic Md BT",
          "Baskerville",
          "Baskerville Old Face",
          "Batang",
          "BatangChe",
          "Bauer Bodoni",
          "Bauhaus 93",
          "Bazooka",
          "Bell MT",
          "Bembo",
          "Benguiat Bk BT",
          "Berlin Sans FB",
          "Berlin Sans FB Demi",
          "Bernard MT Condensed",
          "BernhardFashion BT",
          "BernhardMod BT",
          "Big Caslon",
          "BinnerD",
          "Blackadder ITC",
          "BlairMdITC TT",
          "Bodoni 72",
          "Bodoni 72 Oldstyle",
          "Bodoni 72 Smallcaps",
          "Bodoni MT",
          "Bodoni MT Black",
          "Bodoni MT Condensed",
          "Bodoni MT Poster Compressed",
          "Bookshelf Symbol 7",
          "Boulder",
          "Bradley Hand",
          "Bradley Hand ITC",
          "Bremen Bd BT",
          "Britannic Bold",
          "Broadway",
          "Browallia New",
          "BrowalliaUPC",
          "Brush Script MT",
          "Californian FB",
          "Calisto MT",
          "Calligrapher",
          "Candara",
          "CaslonOpnface BT",
          "Castellar",
          "Centaur",
          "Cezanne",
          "CG Omega",
          "CG Times",
          "Chalkboard",
          "Chalkboard SE",
          "Chalkduster",
          "Charlesworth",
          "Charter Bd BT",
          "Charter BT",
          "Chaucer",
          "ChelthmITC Bk BT",
          "Chiller",
          "Clarendon",
          "Clarendon Condensed",
          "CloisterBlack BT",
          "Cochin",
          "Colonna MT",
          "Constantia",
          "Cooper Black",
          "Copperplate",
          "Copperplate Gothic",
          "Copperplate Gothic Bold",
          "Copperplate Gothic Light",
          "CopperplGoth Bd BT",
          "Corbel",
          "Cordia New",
          "CordiaUPC",
          "Cornerstone",
          "Coronet",
          "Cuckoo",
          "Curlz MT",
          "DaunPenh",
          "Dauphin",
          "David",
          "DB LCD Temp",
          "DELICIOUS",
          "Denmark",
          "DFKai-SB",
          "Didot",
          "DilleniaUPC",
          "DIN",
          "DokChampa",
          "Dotum",
          "DotumChe",
          "Ebrima",
          "Edwardian Script ITC",
          "Elephant",
          "English 111 Vivace BT",
          "Engravers MT",
          "EngraversGothic BT",
          "Eras Bold ITC",
          "Eras Demi ITC",
          "Eras Light ITC",
          "Eras Medium ITC",
          "EucrosiaUPC",
          "Euphemia",
          "Euphemia UCAS",
          "EUROSTILE",
          "Exotc350 Bd BT",
          "FangSong",
          "Felix Titling",
          "Fixedsys",
          "FONTIN",
          "Footlight MT Light",
          "Forte",
          "FrankRuehl",
          "Fransiscan",
          "Freefrm721 Blk BT",
          "FreesiaUPC",
          "Freestyle Script",
          "French Script MT",
          "FrnkGothITC Bk BT",
          "Fruitger",
          "FRUTIGER",
          "Futura",
          "Futura Bk BT",
          "Futura Lt BT",
          "Futura Md BT",
          "Futura ZBlk BT",
          "FuturaBlack BT",
          "Gabriola",
          "Galliard BT",
          "Gautami",
          "Geeza Pro",
          "Geometr231 BT",
          "Geometr231 Hv BT",
          "Geometr231 Lt BT",
          "GeoSlab 703 Lt BT",
          "GeoSlab 703 XBd BT",
          "Gigi",
          "Gill Sans",
          "Gill Sans MT",
          "Gill Sans MT Condensed",
          "Gill Sans MT Ext Condensed Bold",
          "Gill Sans Ultra Bold",
          "Gill Sans Ultra Bold Condensed",
          "Gisha",
          "Gloucester MT Extra Condensed",
          "GOTHAM",
          "GOTHAM BOLD",
          "Goudy Old Style",
          "Goudy Stout",
          "GoudyHandtooled BT",
          "GoudyOLSt BT",
          "Gujarati Sangam MN",
          "Gulim",
          "GulimChe",
          "Gungsuh",
          "GungsuhChe",
          "Gurmukhi MN",
          "Haettenschweiler",
          "Harlow Solid Italic",
          "Harrington",
          "Heather",
          "Heiti SC",
          "Heiti TC",
          "HELV",
          "Herald",
          "High Tower Text",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Mincho ProN",
          "Hoefler Text",
          "Humanst 521 Cn BT",
          "Humanst521 BT",
          "Humanst521 Lt BT",
          "Imprint MT Shadow",
          "Incised901 Bd BT",
          "Incised901 BT",
          "Incised901 Lt BT",
          "INCONSOLATA",
          "Informal Roman",
          "Informal011 BT",
          "INTERSTATE",
          "IrisUPC",
          "Iskoola Pota",
          "JasmineUPC",
          "Jazz LET",
          "Jenson",
          "Jester",
          "Jokerman",
          "Juice ITC",
          "Kabel Bk BT",
          "Kabel Ult BT",
          "Kailasa",
          "KaiTi",
          "Kalinga",
          "Kannada Sangam MN",
          "Kartika",
          "Kaufmann Bd BT",
          "Kaufmann BT",
          "Khmer UI",
          "KodchiangUPC",
          "Kokila",
          "Korinna BT",
          "Kristen ITC",
          "Krungthep",
          "Kunstler Script",
          "Lao UI",
          "Latha",
          "Leelawadee",
          "Letter Gothic",
          "Levenim MT",
          "LilyUPC",
          "Lithograph",
          "Lithograph Light",
          "Long Island",
          "Lydian BT",
          "Magneto",
          "Maiandra GD",
          "Malayalam Sangam MN",
          "Malgun Gothic",
          "Mangal",
          "Marigold",
          "Marion",
          "Marker Felt",
          "Market",
          "Marlett",
          "Matisse ITC",
          "Matura MT Script Capitals",
          "Meiryo",
          "Meiryo UI",
          "Microsoft Himalaya",
          "Microsoft JhengHei",
          "Microsoft New Tai Lue",
          "Microsoft PhagsPa",
          "Microsoft Tai Le",
          "Microsoft Uighur",
          "Microsoft YaHei",
          "Microsoft Yi Baiti",
          "MingLiU",
          "MingLiU_HKSCS",
          "MingLiU_HKSCS-ExtB",
          "MingLiU-ExtB",
          "Minion",
          "Minion Pro",
          "Miriam",
          "Miriam Fixed",
          "Mistral",
          "Modern",
          "Modern No. 20",
          "Mona Lisa Solid ITC TT",
          "Mongolian Baiti",
          "MONO",
          "MoolBoran",
          "Mrs Eaves",
          "MS LineDraw",
          "MS Mincho",
          "MS PMincho",
          "MS Reference Specialty",
          "MS UI Gothic",
          "MT Extra",
          "MUSEO",
          "MV Boli",
          "Nadeem",
          "Narkisim",
          "NEVIS",
          "News Gothic",
          "News GothicMT",
          "NewsGoth BT",
          "Niagara Engraved",
          "Niagara Solid",
          "Noteworthy",
          "NSimSun",
          "Nyala",
          "OCR A Extended",
          "Old Century",
          "Old English Text MT",
          "Onyx",
          "Onyx BT",
          "OPTIMA",
          "Oriya Sangam MN",
          "OSAKA",
          "OzHandicraft BT",
          "Palace Script MT",
          "Papyrus",
          "Parchment",
          "Party LET",
          "Pegasus",
          "Perpetua",
          "Perpetua Titling MT",
          "PetitaBold",
          "Pickwick",
          "Plantagenet Cherokee",
          "Playbill",
          "PMingLiU",
          "PMingLiU-ExtB",
          "Poor Richard",
          "Poster",
          "PosterBodoni BT",
          "PRINCETOWN LET",
          "Pristina",
          "PTBarnum BT",
          "Pythagoras",
          "Raavi",
          "Rage Italic",
          "Ravie",
          "Ribbon131 Bd BT",
          "Rockwell",
          "Rockwell Condensed",
          "Rockwell Extra Bold",
          "Rod",
          "Roman",
          "Sakkal Majalla",
          "Santa Fe LET",
          "Savoye LET",
          "Sceptre",
          "Script",
          "Script MT Bold",
          "SCRIPTINA",
          "Serifa",
          "Serifa BT",
          "Serifa Th BT",
          "ShelleyVolante BT",
          "Sherwood",
          "Shonar Bangla",
          "Showcard Gothic",
          "Shruti",
          "Signboard",
          "SILKSCREEN",
          "SimHei",
          "Simplified Arabic",
          "Simplified Arabic Fixed",
          "SimSun",
          "SimSun-ExtB",
          "Sinhala Sangam MN",
          "Sketch Rockwell",
          "Skia",
          "Small Fonts",
          "Snap ITC",
          "Snell Roundhand",
          "Socket",
          "Souvenir Lt BT",
          "Staccato222 BT",
          "Steamer",
          "Stencil",
          "Storybook",
          "Styllo",
          "Subway",
          "Swis721 BlkEx BT",
          "Swiss911 XCm BT",
          "Sylfaen",
          "Synchro LET",
          "System",
          "Tamil Sangam MN",
          "Technical",
          "Teletype",
          "Telugu Sangam MN",
          "Tempus Sans ITC",
          "Terminal",
          "Thonburi",
          "Traditional Arabic",
          "Trajan",
          "TRAJAN PRO",
          "Tristan",
          "Tubular",
          "Tunga",
          "Tw Cen MT",
          "Tw Cen MT Condensed",
          "Tw Cen MT Condensed Extra Bold",
          "TypoUpright BT",
          "Unicorn",
          "Univers",
          "Univers CE 55 Medium",
          "Univers Condensed",
          "Utsaah",
          "Vagabond",
          "Vani",
          "Vijaya",
          "Viner Hand ITC",
          "VisualUI",
          "Vivaldi",
          "Vladimir Script",
          "Vrinda",
          "Westminster",
          "WHITNEY",
          "Wide Latin",
          "ZapfEllipt BT",
          "ZapfHumnst BT",
          "ZapfHumnst Dm BT",
          "Zapfino",
          "Zurich BlkEx BT",
          "Zurich Ex BT",
          "ZWAdobeF"
        ];
        if (that.options.extendedJsFonts) {
          fontList = fontList.concat(extendedFontList);
        }
        fontList = fontList.concat(that.options.userDefinedFonts);
        fontList = fontList.filter(function(font, position) {
          return fontList.indexOf(font) === position;
        });
        var testString = "mmmmmmmmmmlli";
        var testSize = "72px";
        var h = document.getElementsByTagName("body")[0];
        var baseFontsDiv = document.createElement("div");
        var fontsDiv = document.createElement("div");
        var defaultWidth = {};
        var defaultHeight = {};
        var createSpan = function() {
          var s = document.createElement("span");
          s.style.position = "absolute";
          s.style.left = "-9999px";
          s.style.fontSize = testSize;
          s.style.fontStyle = "normal";
          s.style.fontWeight = "normal";
          s.style.letterSpacing = "normal";
          s.style.lineHeight = "normal";
          s.style.texTransform = "none";
          s.style.textAlign = "left";
          s.style.textDecoration = "none";
          s.style.textShadow = "none";
          s.style.whiteSpace = "normal";
          s.style.wordBreak = "normal";
          s.style.wordSpacing = "normal";
          s.innerHTML = testString;
          return s;
        };
        var createSpanWithFonts = function(fontToDetect, baseFont) {
          var s = createSpan();
          s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
          return s;
        };
        var initializeBaseFontsSpans = function() {
          var spans = [];
          for (
            var index = 0, length = baseFonts.length;
            index < length;
            index++
          ) {
            var s = createSpan();
            s.style.fontFamily = baseFonts[index];
            baseFontsDiv.appendChild(s);
            spans.push(s);
          }
          return spans;
        };
        var initializeFontsSpans = function() {
          var spans = {};
          for (var i = 0, l = fontList.length; i < l; i++) {
            var fontSpans = [];
            for (
              var j = 0, numDefaultFonts = baseFonts.length;
              j < numDefaultFonts;
              j++
            ) {
              var s = createSpanWithFonts(fontList[i], baseFonts[j]);
              fontsDiv.appendChild(s);
              fontSpans.push(s);
            }
            spans[fontList[i]] = fontSpans;
          }
          return spans;
        };
        var isFontAvailable = function(fontSpans) {
          var detected = false;
          for (var i = 0; i < baseFonts.length; i++) {
            detected =
              fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] ||
              fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]];
            if (detected) {
              return detected;
            }
          }
          return detected;
        };
        var baseFontsSpans = initializeBaseFontsSpans();
        h.appendChild(baseFontsDiv);
        for (
          var index = 0, length = baseFonts.length;
          index < length;
          index++
        ) {
          defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth;
          defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight;
        }
        var fontsSpans = initializeFontsSpans();
        h.appendChild(fontsDiv);
        var available = [];
        for (var i = 0, l = fontList.length; i < l; i++) {
          if (isFontAvailable(fontsSpans[fontList[i]])) {
            available.push(fontList[i]);
          }
        }
        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);
        keys.addPreprocessedComponent({
          key: "fonts",
          desc: "支持的字体列表",
          value: available.join("，")
        });
        done(keys);
      }, 1);
    }
    pluginsKey(keys) {
      if (!this.options.excludePlugins) {
        if (this.isIE()) {
          if (!this.options.excludeIEPlugins) {
            keys.addPreprocessedComponent({
              key: "plugins",
              desc: "浏览器安装的插件列表",
              value: this.getIEPlugins().join(",")
            });
          }
        } else {
          keys.addPreprocessedComponent({
            key: "plugins",
            desc: "浏览器安装的插件列表",
            value: this.getRegularPlugins().join(",")
          });
        }
      }
      return keys;
    }
    getRegularPlugins() {
      var plugins = [];
      if (navigator.plugins) {
        for (var i = 0, l = navigator.plugins.length; i < l; i++) {
          if (navigator.plugins[i]) {
            plugins.push(navigator.plugins[i]);
          }
        }
      }
      if (this.pluginsShouldBeSorted()) {
        plugins = plugins.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      return this.map(
        plugins,
        function(p) {
          var mimeTypes = this.map(p, function(mt) {
            return [mt.type, mt.suffixes].join("~");
          }).join(",");
          return [p.name, p.description, mimeTypes].join("::");
        },
        this
      );
    }
    getIEPlugins() {
      var result = [];
      if (
        (Object.getOwnPropertyDescriptor &&
          Object.getOwnPropertyDescriptor(window, "ActiveXObject")) ||
        "ActiveXObject" in window
      ) {
        var names = [
          "AcroPDF.PDF",
          "Adodb.Stream",
          "AgControl.AgControl",
          "DevalVRXCtrl.DevalVRXCtrl.1",
          "MacromediaFlashPaper.MacromediaFlashPaper",
          "Msxml2.DOMDocument",
          "Msxml2.XMLHTTP",
          "PDF.PdfCtrl",
          "QuickTime.QuickTime",
          "QuickTimeCheckObject.QuickTimeCheck.1",
          "RealPlayer",
          "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
          "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
          "Scripting.Dictionary",
          "SWCtl.SWCtl",
          "Shell.UIHelper",
          "ShockwaveFlash.ShockwaveFlash",
          "Skype.Detection",
          "TDCCtl.TDCCtl",
          "WMPlayer.OCX",
          "rmocx.RealPlayer G2 Control",
          "rmocx.RealPlayer G2 Control.1"
        ];
        result = this.map(names, function(name) {
          try {
            new window.ActiveXObject(name);
            return name;
          } catch (e) {
            return null;
          }
        });
      }
      if (navigator.plugins) {
        result = result.concat(this.getRegularPlugins());
      }
      return result;
    }
    pluginsShouldBeSorted() {
      var should = false;
      for (var i = 0, l = this.options.sortPluginsFor.length; i < l; i++) {
        var re = this.options.sortPluginsFor[i];
        if (navigator.userAgent.match(re)) {
          should = true;
          break;
        }
      }
      return should;
    }
    touchSupportKey(keys) {
      if (!this.options.excludeTouchSupport) {
        keys.addPreprocessedComponent({
          key: "touch",
          desc: "是否支持触屏",
          value: this.getTouchSupport()
        });
      }
      return keys;
    }
    hardwareConcurrencyKey(keys) {
      if (!this.options.excludeHardwareConcurrency) {
        keys.addPreprocessedComponent({
          key: "cpuNumber",
          desc: "逻辑处理器数量",
          value: this.getHardwareConcurrency()
        });
      }
      return keys;
    }
    hasSessionStorage() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return true;
      }
    }
    hasLocalStorage() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return true;
      }
    }
    hasIndexedDB() {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return true;
      }
    }
    getHardwareConcurrency() {
      if (navigator.hardwareConcurrency) {
        return navigator.hardwareConcurrency;
      }
      return 0;
    }
    getNavigatorCpuClass() {
      if (navigator.cpuClass) {
        return navigator.cpuClass;
      } else {
        return "";
      }
    }
    getNavigatorPlatform() {
      if (navigator.platform) {
        return navigator.platform;
      } else {
        return "";
      }
    }
    getDoNotTrack() {
      if (navigator.doNotTrack) {
        return navigator.doNotTrack == "yes" || navigator.doNotTrack == "1"
          ? 0
          : 1;
      } else {
        if (navigator.msDoNotTrack) {
          return navigator.msDoNotTrack == "yes" ||
            navigator.msDoNotTrack == "1"
            ? 0
            : 1;
        } else {
          if (window.doNotTrack) {
            return window.doNotTrack == ("yes" || "1") ? 0 : 1;
          } else {
            return 0;
          }
        }
      }
    }
    getTouchSupport() {
      var touchObj = {};
      touchObj.isSupportTouch = "ontouchend" in document ? 1 : 0;
      touchObj.isEvent = touchObj.isSupportTouch ? 1 : 0;
      return touchObj.isEvent;
    }
    getCanvasFp() {
      var result = [];
      var canvas = document.createElement("canvas");
      canvas.width = 2000;
      canvas.height = 200;
      canvas.style.display = "inline";
      var ctx = canvas.getContext("2d");
      ctx.rect(0, 0, 10, 10);
      ctx.rect(2, 2, 6, 6);
      result.push(
        "canvas winding:" +
          (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no")
      );
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      if (this.options.dontUseFakeFontInCanvas) {
        ctx.font = "11pt Arial";
      } else {
        ctx.font = "11pt no-real-font-123";
      }
      ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
      ctx.font = "18pt Arial";
      ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgb(255,0,255)";
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(0,255,255)";
      ctx.beginPath();
      ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(255,255,0)";
      ctx.beginPath();
      ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(255,0,255)";
      ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
      ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
      if (canvas.toDataURL) {
        result.push("canvas fp:" + canvas.toDataURL());
      }
      return result.join("~");
    }
    getWebglFp() {
      var gl;
      var fa2s = function(fa) {
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return "[" + fa[0] + ", " + fa[1] + "]";
      };
      var maxAnisotropy = function(gl) {
        var ext =
          gl.getExtension("EXT_texture_filter_anisotropic") ||
          gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
          gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (ext) {
          var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          if (anisotropy === 0) {
            anisotropy = 2;
          }
          return anisotropy;
        } else {
          return null;
        }
      };
      gl = this.getWebglCanvas();
      if (!gl) {
        return null;
      }
      var result = [];
      var vShaderTemplate =
        "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
      var fShaderTemplate =
        "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
      var vertexPosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
      var vertices = new Float32Array([
        -0.2,
        -0.9,
        0,
        0.4,
        -0.26,
        0,
        0,
        0.732134444,
        0
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      vertexPosBuffer.itemSize = 3;
      vertexPosBuffer.numItems = 3;
      var program = gl.createProgram();
      var vshader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vshader, vShaderTemplate);
      gl.compileShader(vshader);
      var fshader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fshader, fShaderTemplate);
      gl.compileShader(fshader);
      gl.attachShader(program, vshader);
      gl.attachShader(program, fshader);
      gl.linkProgram(program);
      gl.useProgram(program);
      program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
      program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
      gl.enableVertexAttribArray(program.vertexPosArray);
      gl.vertexAttribPointer(
        program.vertexPosAttrib,
        vertexPosBuffer.itemSize,
        gl.FLOAT,
        !1,
        0,
        0
      );
      gl.uniform2f(program.offsetUniform, 1, 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
      try {
        result.push(gl.canvas.toDataURL());
      } catch (e) {}
      result.push(
        "extensions:" + (gl.getSupportedExtensions() || []).join(";")
      );
      result.push(
        "webgl aliased line width range:" +
          fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE))
      );
      result.push(
        "webgl aliased point size range:" +
          fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE))
      );
      result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
      result.push(
        "webgl antialiasing:" +
          (gl.getContextAttributes().antialias ? "yes" : "no")
      );
      result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
      result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
      result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
      result.push("webgl max anisotropy:" + maxAnisotropy(gl));
      result.push(
        "webgl max combined texture image units:" +
          gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)
      );
      result.push(
        "webgl max cube map texture size:" +
          gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE)
      );
      result.push(
        "webgl max fragment uniform vectors:" +
          gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)
      );
      result.push(
        "webgl max render buffer size:" +
          gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
      );
      result.push(
        "webgl max texture image units:" +
          gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
      );
      result.push(
        "webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE)
      );
      result.push(
        "webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS)
      );
      result.push(
        "webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
      );
      result.push(
        "webgl max vertex texture image units:" +
          gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
      );
      result.push(
        "webgl max vertex uniform vectors:" +
          gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS)
      );
      result.push(
        "webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS))
      );
      result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
      result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
      result.push(
        "webgl shading language version:" +
          gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
      );
      result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
      result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
      result.push("webgl version:" + gl.getParameter(gl.VERSION));
      try {
        var extensionDebugRendererInfo = gl.getExtension(
          "WEBGL_debug_renderer_info"
        );
        if (extensionDebugRendererInfo) {
          result.push(
            "webgl unmasked vendor:" +
              gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL)
          );
          result.push(
            "webgl unmasked renderer:" +
              gl.getParameter(
                extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL
              )
          );
        }
      } catch (e) {}
      if (!gl.getShaderPrecisionFormat) {
        return result.join("~");
      }
      result.push(
        "webgl vertex shader high float precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision
      );
      result.push(
        "webgl vertex shader high float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin
      );
      result.push(
        "webgl vertex shader high float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax
      );
      result.push(
        "webgl vertex shader medium float precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
            .precision
      );
      result.push(
        "webgl vertex shader medium float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
            .rangeMin
      );
      result.push(
        "webgl vertex shader medium float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
            .rangeMax
      );
      result.push(
        "webgl vertex shader low float precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision
      );
      result.push(
        "webgl vertex shader low float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin
      );
      result.push(
        "webgl vertex shader low float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax
      );
      result.push(
        "webgl fragment shader high float precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
            .precision
      );
      result.push(
        "webgl fragment shader high float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
            .rangeMin
      );
      result.push(
        "webgl fragment shader high float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
            .rangeMax
      );
      result.push(
        "webgl fragment shader medium float precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
            .precision
      );
      result.push(
        "webgl fragment shader medium float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
            .rangeMin
      );
      result.push(
        "webgl fragment shader medium float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
            .rangeMax
      );
      result.push(
        "webgl fragment shader low float precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT)
            .precision
      );
      result.push(
        "webgl fragment shader low float precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin
      );
      result.push(
        "webgl fragment shader low float precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax
      );
      result.push(
        "webgl vertex shader high int precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision
      );
      result.push(
        "webgl vertex shader high int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin
      );
      result.push(
        "webgl vertex shader high int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax
      );
      result.push(
        "webgl vertex shader medium int precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision
      );
      result.push(
        "webgl vertex shader medium int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin
      );
      result.push(
        "webgl vertex shader medium int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax
      );
      result.push(
        "webgl vertex shader low int precision:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision
      );
      result.push(
        "webgl vertex shader low int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin
      );
      result.push(
        "webgl vertex shader low int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax
      );
      result.push(
        "webgl fragment shader high int precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision
      );
      result.push(
        "webgl fragment shader high int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin
      );
      result.push(
        "webgl fragment shader high int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax
      );
      result.push(
        "webgl fragment shader medium int precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
            .precision
      );
      result.push(
        "webgl fragment shader medium int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
            .rangeMin
      );
      result.push(
        "webgl fragment shader medium int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
            .rangeMax
      );
      result.push(
        "webgl fragment shader low int precision:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision
      );
      result.push(
        "webgl fragment shader low int precision rangeMin:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin
      );
      result.push(
        "webgl fragment shader low int precision rangeMax:" +
          gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax
      );
      return result.join("~");
    }
    getWebglObj(keys) {
      var gl;
      var fa2s = function(fa) {
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return "[" + fa[0] + ", " + fa[1] + "]";
      };
      var maxAnisotropy = function(gl) {
        var ext =
          gl.getExtension("EXT_texture_filter_anisotropic") ||
          gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
          gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (ext) {
          var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          if (anisotropy === 0) {
            anisotropy = 2;
          }
          return anisotropy;
        } else {
          return null;
        }
      };
      gl = this.getWebglCanvas();
      if (!gl) {
        return keys;
      }
      var vShaderTemplate =
        "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
      var fShaderTemplate =
        "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
      var vertexPosBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
      var vertices = new Float32Array([
        -0.2,
        -0.9,
        0,
        0.4,
        -0.26,
        0,
        0,
        0.732134444,
        0
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      vertexPosBuffer.itemSize = 3;
      vertexPosBuffer.numItems = 3;
      var program = gl.createProgram();
      var vshader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vshader, vShaderTemplate);
      gl.compileShader(vshader);
      var fshader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fshader, fShaderTemplate);
      gl.compileShader(fshader);
      gl.attachShader(program, vshader);
      gl.attachShader(program, fshader);
      gl.linkProgram(program);
      gl.useProgram(program);
      program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
      program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
      gl.enableVertexAttribArray(program.vertexPosArray);
      gl.vertexAttribPointer(
        program.vertexPosAttrib,
        vertexPosBuffer.itemSize,
        gl.FLOAT,
        !1,
        0,
        0
      );
      gl.uniform2f(program.offsetUniform, 1, 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
      keys = this.arrAddItems(
        keys,
        "支持的WebGL扩展",
        (gl.getSupportedExtensions() || []).join(";") || "",
        "webglExtensions"
      );
      keys = this.arrAddItems(
        keys,
        "反锯齿线宽度范围",
        fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)) || "",
        "webglLineRange"
      );
      keys = this.arrAddItems(
        keys,
        "单点渲染的最大尺寸区域",
        fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)) || "",
        "webglSizeRange"
      );
      keys = this.arrAddItems(
        keys,
        "alpha bits",
        gl.getParameter(gl.ALPHA_BITS) || "",
        "webglAlphaBits"
      );
      keys = this.arrAddItems(
        keys,
        "是否执行抗锯齿",
        (gl.getContextAttributes().antialias ? "yes" : "no") || "",
        "webglAntialiasing"
      );
      keys = this.arrAddItems(
        keys,
        "渲染蓝色所用位数",
        gl.getParameter(gl.BLUE_BITS) || "",
        "webglBlueBits"
      );
      keys = this.arrAddItems(
        keys,
        "深度缓冲区位数",
        gl.getParameter(gl.DEPTH_BITS) || "",
        "webglDepthBits"
      );
      keys = this.arrAddItems(
        keys,
        "渲染绿色所用位数",
        gl.getParameter(gl.GREEN_BITS) || "",
        "webglGreenBits"
      );
      keys = this.arrAddItems(
        keys,
        "最大各向异性",
        maxAnisotropy(gl) || "",
        "webglMaxAnisotropy"
      );
      keys = this.arrAddItems(
        keys,
        "最大合并纹理图像单位",
        gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) || "",
        "webglMaxTextureUnits"
      );
      keys = this.arrAddItems(
        keys,
        "最大立方体地图纹理大小",
        gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE) || "",
        "webglMaxMapTextureSize"
      );
      keys = this.arrAddItems(
        keys,
        "最大碎片均匀向量",
        gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) || "",
        "webglMaxVectors"
      );
      keys = this.arrAddItems(
        keys,
        "最大渲染缓存大小",
        gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) || "",
        "webglMaxRenderbufSize"
      );
      keys = this.arrAddItems(
        keys,
        "最大纹理图像单元",
        gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS) || "",
        "webglMaxTextureimageUnits"
      );
      keys = this.arrAddItems(
        keys,
        "最大纹理尺寸",
        gl.getParameter(gl.MAX_TEXTURE_SIZE) || "",
        "webglMaxTextureSize"
      );
      keys = this.arrAddItems(
        keys,
        "可变向量的最大数量",
        gl.getParameter(gl.MAX_VARYING_VECTORS) || "",
        "webglMaxVaryingVectors"
      );
      keys = this.arrAddItems(
        keys,
        "最大向量属性",
        gl.getParameter(gl.MAX_VERTEX_ATTRIBS) || "",
        "webglMaxVertexAttribs"
      );
      keys = this.arrAddItems(
        keys,
        "最大顶点文理图像单元",
        gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) || "",
        "webglMaxVertexUnits"
      );
      keys = this.arrAddItems(
        keys,
        "最大顶点一致向量",
        gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) || "",
        "webglMaxVertexVectors"
      );
      keys = this.arrAddItems(
        keys,
        "视窗最大暗度",
        fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)) || "",
        "webglMaxViewportDims"
      );
      keys = this.arrAddItems(
        keys,
        "渲染红色所用位数",
        gl.getParameter(gl.RED_BITS) || "",
        "webglRedBits"
      );
      keys = this.arrAddItems(
        keys,
        "渲染器",
        gl.getParameter(gl.RENDERER) || "",
        "webglRenderer"
      );
      keys = this.arrAddItems(
        keys,
        "着色语言版本",
        gl.getParameter(gl.SHADING_LANGUAGE_VERSION) || "",
        "webglShadingLangVersion"
      );
      keys = this.arrAddItems(
        keys,
        "模板bit",
        gl.getParameter(gl.STENCIL_BITS) || "",
        "webglStencilBits"
      );
      keys = this.arrAddItems(
        keys,
        "供应商",
        gl.getParameter(gl.VENDOR) || "",
        "webglVendor"
      );
      keys = this.arrAddItems(
        keys,
        "版本",
        gl.getParameter(gl.VERSION) || "",
        "webglVersion"
      );
      try {
        var extensionDebugRendererInfo = gl.getExtension(
          "WEBGL_debug_renderer_info"
        );
        if (extensionDebugRendererInfo) {
          keys = this.arrAddItems(
            keys,
            "未标记webgl供应商",
            gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) ||
              "",
            "webglUnmaskedVendor"
          );

          keys = this.arrAddItems(
            keys,
            "未标记的webgl渲染器",
            gl.getParameter(
              extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL
            ) || "",
            "webglUnmaskedRenderer"
          );
        }
      } catch (e) {}
      if (!gl.getShaderPrecisionFormat) {
        return keys;
      }
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT)
          .precision || "",
        "webglVertexShaderHfp"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin ||
          "",
        "webglVertexShaderHfpri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax ||
          "",
        "webglVertexShaderHfpra"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
          .precision || "",
        "webglVertexShadermfp"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
          .rangeMin || "",
        "webglVertexShadermfpri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT)
          .rangeMax || "",
        "webglVertexShadermfpra"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision ||
          "",
        "webglVertexShaderLfp"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin ||
          "",
        "webglVertexShaderLfpri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax ||
          "",
        "webglVertexShaderLfpra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
          .precision || "",
        "webglFragShaderHfp"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
          .rangeMin || "",
        "webglFragShaderHfpri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
          .rangeMax || "",
        "webglFragShaderHfpra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
          .precision || "",
        "webglFragShadermfp"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
          .rangeMin || "",
        "webglFragShadermfpri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT)
          .rangeMax || "",
        "webglFragShadermfpra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT)
          .precision || "",
        "webglFragShaderLfp"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT)
          .rangeMin || "",
        "webglFragShaderLfpri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT)
          .rangeMax || "",
        "webglFragShaderLfpra"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision ||
          "",
        "webglVertexShaderHip"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin ||
          "",
        "webglVertexShaderHipri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax ||
          "",
        "webglVertexShaderHipra"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT)
          .precision || "",
        "webglVertexShaderMip"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin ||
          "",
        "webglVertexShaderMipri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax ||
          "",
        "webglVertexShaderMipra"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器精度",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision ||
          "",
        "webglVertexShaderLip"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最小值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin ||
          "",
        "webglVertexShaderLipri"
      );
      keys = this.arrAddItems(
        keys,
        "顶点着色器最大值",
        gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax ||
          "",
        "webglVertexShaderLipra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT)
          .precision || "",
        "webglFragShaderHip"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin ||
          "",
        "webglFragShaderHipri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax ||
          "",
        "webglFragShaderHipra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
          .precision || "",
        "webglFragShaderMip"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
          .rangeMin || "",
        "webglFragShaderMipri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT)
          .rangeMax || "",
        "webglFragShaderMipra"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器精度",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision ||
          "",
        "webglFragShaderLip"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最小值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin ||
          "",
        "webglFragShaderLipri"
      );
      keys = this.arrAddItems(
        keys,
        "片段着色器最大值",
        gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax ||
          "",
        "webglFragShaderLipra"
      );
      return keys;
    }
    getWebglVendorAndRenderer() {
      try {
        var glContext = this.getWebglCanvas();
        var extensionDebugRendererInfo = glContext.getExtension(
          "WEBGL_debug_renderer_info"
        );
        return (
          glContext.getParameter(
            extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL
          ) +
          "~" +
          glContext.getParameter(
            extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL
          )
        );
      } catch (e) {
        return null;
      }
    }
    getAdBlock() {
      var ads = document.createElement("div");
      ads.innerHTML = "&nbsp;";
      ads.className = "adsbox";
      var result = 0;
      try {
        document.body.appendChild(ads);
        result =
          document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
        document.body.removeChild(ads);
        result = 1;
      } catch (e) {
        result = 0;
      }
      return result;
    }
    getHasLiedLanguages() {
      if (typeof navigator.languages !== "undefined") {
        try {
          var firstLanguages = navigator.languages[0].substr(0, 2);
          if (firstLanguages !== navigator.language.substr(0, 2)) {
            return 1;
          }
        } catch (err) {
          return 1;
        }
      }
      return 0;
    }
    getHasLiedResolution() {
      if (window.screen.width < window.screen.availWidth) {
        return 1;
      }
      if (window.screen.height < window.screen.availHeight) {
        return 1;
      }
      return 0;
    }
    getHasLiedOs() {
      var userAgent = navigator.userAgent.toLowerCase();
      var oscpu = navigator.oscpu;
      var platform = navigator.platform.toLowerCase();
      var os;
      if (userAgent.indexOf("windows phone") >= 0) {
        os = "Windows Phone";
      } else {
        if (userAgent.indexOf("win") >= 0) {
          os = "Windows";
        } else {
          if (userAgent.indexOf("android") >= 0) {
            os = "Android";
          } else {
            if (userAgent.indexOf("linux") >= 0) {
              os = "Linux";
            } else {
              if (
                userAgent.indexOf("iphone") >= 0 ||
                userAgent.indexOf("ipad") >= 0
              ) {
                os = "iOS";
              } else {
                if (userAgent.indexOf("mac") >= 0) {
                  os = "Mac";
                } else {
                  os = "Other";
                }
              }
            }
          }
        }
      }
      var mobileDevice;
      if (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      ) {
        mobileDevice = 1;
      } else {
        mobileDevice = 0;
      }
      if (
        mobileDevice &&
        os !== "Windows Phone" &&
        os !== "Android" &&
        os !== "iOS" &&
        os !== "Other"
      ) {
        return 1;
      }
      if (typeof oscpu !== "undefined") {
        oscpu = oscpu.toLowerCase();
        if (
          oscpu.indexOf("win") >= 0 &&
          os !== "Windows" &&
          os !== "Windows Phone"
        ) {
          return 1;
        } else {
          if (
            oscpu.indexOf("linux") >= 0 &&
            os !== "Linux" &&
            os !== "Android"
          ) {
            return 1;
          } else {
            if (oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
              return 1;
            } else {
              if (
                (oscpu.indexOf("win") === -1 &&
                  oscpu.indexOf("linux") === -1 &&
                  oscpu.indexOf("mac") === -1) !==
                (os === "Other")
              ) {
                return 1;
              }
            }
          }
        }
      }
      if (
        platform.indexOf("win") >= 0 &&
        os !== "Windows" &&
        os !== "Windows Phone"
      ) {
        return 1;
      } else {
        if (
          (platform.indexOf("linux") >= 0 ||
            platform.indexOf("android") >= 0 ||
            platform.indexOf("pike") >= 0) &&
          os !== "Linux" &&
          os !== "Android"
        ) {
          return 1;
        } else {
          if (
            (platform.indexOf("mac") >= 0 ||
              platform.indexOf("ipad") >= 0 ||
              platform.indexOf("ipod") >= 0 ||
              platform.indexOf("iphone") >= 0) &&
            os !== "Mac" &&
            os !== "iOS"
          ) {
            return 1;
          } else {
            if (
              (platform.indexOf("win") === -1 &&
                platform.indexOf("linux") === -1 &&
                platform.indexOf("mac") === -1 &&
                platform.indexOf("ipad") === -1 &&
                platform.indexOf("ipod") === -1 &&
                platform.indexOf("iphone") === -1) !==
              (os === "Other")
            ) {
              return 1;
            }
          }
        }
      }
      if (
        typeof navigator.plugins === "undefined" &&
        os !== "Windows" &&
        os !== "Windows Phone"
      ) {
        return 1;
      }
      return 0;
    }
    getHasLiedBrowser() {
      var userAgent = navigator.userAgent.toLowerCase();
      var productSub = navigator.productSub;
      var browser;
      if (userAgent.indexOf("firefox") >= 0) {
        browser = "Firefox";
      } else {
        if (userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0) {
          browser = "Opera";
        } else {
          if (userAgent.indexOf("chrome") >= 0) {
            browser = "Chrome";
          } else {
            if (userAgent.indexOf("safari") >= 0) {
              browser = "Safari";
            } else {
              if (userAgent.indexOf("trident") >= 0) {
                browser = "Internet Explorer";
              } else {
                browser = "Other";
              }
            }
          }
        }
      }
      if (
        (browser === "Chrome" || browser === "Safari" || browser === "Opera") &&
        productSub !== "20030107"
      ) {
        return 1;
      }
      var tempRes = eval.toString().length;
      if (
        tempRes === 37 &&
        browser !== "Safari" &&
        browser !== "Firefox" &&
        browser !== "Other"
      ) {
        return 1;
      } else {
        if (
          tempRes === 39 &&
          browser !== "Internet Explorer" &&
          browser !== "Other"
        ) {
          return 1;
        } else {
          if (
            tempRes === 33 &&
            browser !== "Chrome" &&
            browser !== "Opera" &&
            browser !== "Other"
          ) {
            return 1;
          }
        }
      }
      var errFirefox;
      try {
        throw "a";
      } catch (err) {
        try {
          err.toSource();
          errFirefox = 1;
        } catch (errOfErr) {
          errFirefox = 0;
        }
      }
      if (errFirefox && browser !== "Firefox" && browser !== "Other") {
        return 1;
      }
      return 0;
    }
    isCanvasSupported() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    }
    isWebGlSupported() {
      if (!this.isCanvasSupported()) {
        return false;
      }
      var glContext = this.getWebglCanvas();
      return !!window.WebGLRenderingContext && !!glContext;
    }
    isIE() {
      if (navigator.appName === "Microsoft Internet Explorer") {
        return true;
      } else {
        if (
          navigator.appName === "Netscape" &&
          /Trident/.test(navigator.userAgent)
        ) {
          return true;
        } else {
          if (
            navigator.appName === "Netscape" &&
            /Edge/.test(navigator.userAgent)
          ) {
            return true;
          }
        }
      }
      return false;
    }
    hasSwfObjectLoaded() {
      return typeof window.swfobject !== "undefined";
    }
    hasMinFlashInstalled() {
      return window.swfobject.hasFlashPlayerVersion("9.0.0");
    }
    addFlashDivNode() {
      var node = document.createElement("div");
      node.setAttribute("id", this.options.swfContainerId);
      document.body.appendChild(node);
    }
    loadSwfAndDetectFonts(done) {
      var hiddenCallback = "___fp_swf_loaded";
      window[hiddenCallback] = function(fonts) {
        done(fonts);
      };
      var id = this.options.swfContainerId;
      this.addFlashDivNode();
      var flashvars = { onReady: hiddenCallback };
      var flashparams = { allowScriptAccess: "always", menu: "false" };
      window.swfobject.embedSWF(
        this.options.swfPath,
        id,
        "1",
        "1",
        "9.0.0",
        false,
        flashvars,
        flashparams,
        {}
      );
    }
    getWebglCanvas() {
      var canvas = document.createElement("canvas");
      var gl = null;
      try {
        gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      } catch (e) {}
      if (!gl) {
        gl = null;
      }
      return gl;
    }
    uuid_product(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) {
          uuid[i] = chars[0 | (Math.random() * radix)];
        }
      } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 3) | 8 : r];
          }
        }
      }
      return uuid.join("");
    }
    each(obj, iterator, context) {
      if (obj === null) {
        return;
      }
      if (this.nativeForEach && obj.forEach === this.nativeForEach) {
        obj.forEach(iterator, context);
      } else {
        if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) {
              return;
            }
          }
        } else {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (iterator.call(context, obj[key], key, obj) === {}) {
                return;
              }
            }
          }
        }
      }
    }
    map(obj, iterator, context) {
      var results = [];
      if (obj == null) {
        return results;
      }
      if (this.nativeMap && obj.map === this.nativeMap) {
        return obj.map(iterator, context);
      }
      this.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });
      return results;
    }
    ajax(done, jsonStr, url) {
      let that = this;
      var xhr;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      xhr.open("POST", url, true);
      xhr.timeout = this.options.timeout;
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(jsonStr);
      xhr.ontimeout = function(){
          let outResult = {
          traceId: "",
          errCode: 1003,
          success:false
        };
       return done(outResult);
      }
      xhr.onerror = function(e){
        let outResult;  
        if(xhr.status == 302) {
          outResult = {
            traceId: "",
            errCode: 1004,
            success:false
          };
        } else {
          outResult = {
            traceId: "",
            errCode: 1001,
            success:false
          };
        }
        return done(outResult);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            let res = JSON.parse(xhr.responseText);
            if (!res.success) {
              res.traceId = ''
            }
            return done(res);
          } else if (xhr.status !==200 && xhr.status !== 0 ) {
              let outResult = {
                traceId: "",
                errCode: 1002,
                success:false
              };
              return done(outResult);
          }
        }
      };
    }
    setCookie(cname, cvalue, exday) {
      let d = new Date();
      let exdays = exday || 66666;
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    getCookie(cname) {
      if(!navigator.cookieEnabled) {
        return '';
      }
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    setLocalStorage(key, value) {
      localStorage.setItem(key, value);
    }
    getLocalStorage(key) {
      if (!this.hasLocalStorage()) {
        return '';
      }
      let localValue = localStorage.getItem(key);
      return localValue;
    }
    // 打开indexdb
    openDB(dbObj, dbversion){
      //建立或打开数据库，建立对象存储空间(ObjectStore)
      var that = this;
      var version = dbversion || 1;
      var request = that.indexedDB.open(dbObj.name,version);
      request.onerror = function(e){
        console.log(e.currentTarget.error.message);
      };
      request.onsuccess = function(e){
        dbObj.db = e.target.result;
        let name = dbObj.name;
        that.getDataByKey(dbObj.db, dbObj.ojstore.name, version, dbObj, name);
        //console.log('成功建立并打开数据库:'+dbObj.ojstore.name+' version'+dbversion);
      };
      request.onupgradeneeded=function(e){
          var db = e.target.result,transaction= e.target.transaction,store;
          if(!db.objectStoreNames.contains(dbObj.ojstore.name)){
            //没有该对象空间时创建该对象空间
            store = db.createObjectStore(dbObj.ojstore.name,{keyPath:dbObj.ojstore.keypath});
            console.log('create success')
            // console.log('成功建立对象存储空间：'+dbObj.ojstore.name);
          }
      };
    }
    // 新增数据
    addData(db, storename, data){
        //添加数据，重复添加会报错
      let store = db.transaction(storename,'readwrite').objectStore(storename);
      let request;
      request = store.add(data);
      request.onerror = function(){
        console.error('add fail');
      };
      request.onsuccess = function(){
        console.log('add success');
      };
    }
    // 获取数据库存储数据
    getDataByKey(db, storename, key, dbObj, name){
        //根据存储空间的键找到对应数据
      let that = this;
      let store = db.transaction(storename,'readwrite').objectStore(storename);
      let request = store.get(key);
      request.onerror = function(){
        console.error('getDataByKey error');
      };
      request.onsuccess = function(e){
        dbObj.result = e.target.result;
        that[name] = true;
        console.log('查找数据成功');
      };
    }
    clearData(db, storename){
      //删除存储空间全部记录
      var store = db.transaction(storename,'readwrite').objectStore(storename);
      store.clear();
      console.log('已删除存储空间'+storename+'全部记录');
    }
    check(dbObj, privacy) {
      let result1;
      let name = this[dbObj].name;
      let mark = this[dbObj].markName;
      if (this[dbObj].result) {
        result1 = this[dbObj].result[name];
      }
      let result2 = this.getCookie(name);
      let result3 = this.getLocalStorage(name);
      if(name == 'uuid') {
        this.storageCode = result3 || result2 || result1
      }
      if (result1 && result1 == result2 && result2 == result3 || (privacy && result2 == result3)) {
        console.log('Storage consistency');
        this[mark] = 3;
      } else if (result1 === undefined && result2 === "" && result3 === null || (privacy && result2 === "" && result3 === null) ) {
        console.log('Storage empty');
        this[mark] = 1;
      } else {
        console.log('Storage tampered');
        this[mark] = 2;
      }
    }
    set(dbObj, name) {
      let db = this[dbObj].db;
      let storeName = this[dbObj].ojstore.name;
      let data;
      if (name == 'startTime') {
        data = new Date().getTime();
      } else {
        data = this.uuid_product();
        this.storageCode = data;
      }
      this.setCookie(name, data);
      if(db) {
        let addData = {};
        addData['id'] = 1;
        addData[name] = data;
        this.clearData(db, storeName);
        this.addData(db, storeName, addData);
      }
      this.setLocalStorage(name,data)
    }
    setMark() {
      if (this.idMark === 3 && this.timeMark === 3) {
        this.mark = 3;
      } else if (this.idMark === 1 && this.timeMark === 1) {
        this.mark = 1;
        this.reset();
      } else {
        this.mark = 2;
      }
    }
    reset() {
      this.set('myDB_time', 'startTime');
      this.set('myDB_uuid', 'uuid');
    }
    handleValue(keys) {
      let { rule, isIntercept } = this.options;
      if (!rule || typeof (rule) !== 'object' ) {
        return keys;
      }
      let data = keys.data;
      let length = data.length;
      for (let key in rule) {
        for (let i = 0;i < length;i++) {
          if (data[i].key === key) {
            this.meta.push({
              key: data[i].key,
              desc: data[i].key + '长度',
              length: data[i].value.length,
              customLength: rule[key]
            })
            if (isIntercept && data[i].value.length > rule[key]) {
              data[i].value = data[i].value.substr(0, rule[key]);
            }
            break;
          }
        }
      }
      return keys;
    }
  }
  return BxH5DevicePrint;
});
