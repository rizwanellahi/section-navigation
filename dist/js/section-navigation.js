function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var contentContainer = document.querySelector(".content-container");
var sections = document.querySelectorAll(".content-section");
var nav = document.querySelector(".nav-section");
var menu = nav.querySelector(".nav-menu");
var links = nav.querySelectorAll(".menu-item-link");
var activeLine = nav.querySelector(".active-nav");
var sectionOffset = nav.offsetHeight + 24;
var activeClass = "active";
var activeIndex = 0;
var isScrolling = true;
var userScroll = true;

var setActiveClass = function setActiveClass() {
  links[activeIndex].classList.add(activeClass);
};

var removeActiveClass = function removeActiveClass() {
  links[activeIndex].classList.remove(activeClass);
};

var moveActiveLine = function moveActiveLine() {
  var link = links[activeIndex];
  var linkX = link.getBoundingClientRect().x;
  var menuX = menu.getBoundingClientRect().x;
  activeLine.style.transform = "translateX(".concat(menu.scrollLeft - menuX + linkX, "px)");
  activeLine.style.width = "".concat(link.offsetWidth, "px");
};

var setMenuLeftPosition = function setMenuLeftPosition(position) {
  menu.scrollTo({
    left: position,
    behavior: "smooth"
  });
};

var checkMenuOverflow = function checkMenuOverflow() {
  var activeLink = links[activeIndex].getBoundingClientRect();
  var offset = 30;

  if (Math.floor(activeLink.right) > window.innerWidth) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.right - window.innerWidth + offset);
  } else if (activeLink.left < 0) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.left - offset);
  }
};

var handleActiveLinkUpdate = function handleActiveLinkUpdate(current) {
  removeActiveClass();
  activeIndex = current;
  checkMenuOverflow();
  setActiveClass();
  moveActiveLine();
};

var init = function init() {
  moveActiveLine(links[0]);
  document.documentElement.style.setProperty("--section-offset", sectionOffset);
};

links.forEach(function (link, index) {
  return link.addEventListener("click", function () {
    userScroll = false;
    handleActiveLinkUpdate(index);
  });
});
window.addEventListener("scroll", function () {
  var currentIndex = contentContainer.getBoundingClientRect().top < 0 ? sections.length - 1 - _toConsumableArray(sections).reverse().findIndex(function (section) {
    return window.scrollY >= section.offsetTop - sectionOffset * 2;
  }) : 0;

  if (userScroll && activeIndex !== currentIndex) {
    handleActiveLinkUpdate(currentIndex);
  } else {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
      return userScroll = true;
    }, 100);
  }
});
init();