let fixedHeader, navigationPanel, logoAstdov, navButtonsHeaderNav;
function setValuesHeaderNavPanelAnimation(){
  window.requestAnimationFrame(setValuesHeaderNavPanelAnimation);
  if(navigationPanel.top == fixedHeader.offsetHeight + "px") return;
  navigationPanel.style.top = fixedHeader.offsetHeight + "px";
}
function hoverAndHideNavigationPanel(){
  navigationPanel.style.display = "block";
  if(!navigationPanel.isDisplayed){
    navigationPanel.style.transform = "translate(0, 0)";
  }
  else{
    navigationPanel.style.transform = "translate(-100%, 0)";
    function transitionEnd(){
      if(navigationPanel.style.transform === "translate(-100%, 0)") navigationPanel.style.display = "none";
      navigationPanel.removeEventListener("transitionend", transitionEnd);
    }
    navigationPanel.addEventListener("transitionend", transitionEnd);
  }
  navigationPanel.isDisplayed = !navigationPanel.isDisplayed;
}
window.addEventListener("DOMContentLoaded", () => {
  logoAstdov = document.getElementById("logo_astdov");
  fixedHeader = document.getElementById("header");
  navigationPanel = document.getElementById("navigation_panel");
  navButtonsHeaderNav = document.getElementById("header_nav-buttons");
  logoAstdov.addEventListener("click", hoverAndHideNavigationPanel);
  navButtonsHeaderNav.addEventListener("click", (e) => {
    const target = e.target;
    window.location.href = target.getAttribute("url");
  });
  navigationPanel.isDisplayed = false;
  setValuesHeaderNavPanelAnimation();
  window.addEventListener("scroll", () => {
    if(window.scrollY > 0) fixedHeader.classList.add("headerScrollDownPage");
    else fixedHeader.classList.remove("headerScrollDownPage");
  })
});