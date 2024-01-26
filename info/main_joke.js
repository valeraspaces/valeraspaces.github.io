console.log("Привіт! Я тут...");
let ditxhNum = 1;
window.addEventListener("DOMContentLoaded", () => {
  console.log("Ммм.");
  setTimeout(() => {
    const h = document.getElementById("header");
    h.innerHTML = `
      Щось пішло 
    `;
    for(let n = 1; n <= 10000; n++){
      h.textContent += "undefined ";
    }
    setTimeout(() => {
      document.getElementById("header").remove();
      window.scrollTo(0, 0);
    }, 5000);
  }, 10000);
  setTimeout(() => {
    let rdTxt = "0000011011000101110";
    const doktilo = document.getElementsByTagName("html")[0];
    const dochirniyEltilo = doktilo.childNodes;
    function recursTxtRedag(dochirniy){
      for(let dokEl of dochirniy){
        if(dokEl instanceof Text){
          const dlinaOfdokElText = dokEl.textContent.length;
          dokEl.textContent = "";
          for(qd = 0; qd
 < dlinaOfdokElText; qd++) dokEl.textContent += Math.round(Math.random());
        }
        else if(dokEl.childNodes) recursTxtRedag(dokEl.childNodes);
        else return;
      }
    }
    recursTxtRedag(dochirniyEltilo);
  }, 18000);
  function animShumOfElementsKill(){
    window.requestAnimationFrame(animShumOfElementsKill);
    const tiloHt = document.getElementsByTagName("body")[0];
    function recurs(nodeList){
      for(let nd of nodeList){
        if(!nd || nd instanceof Text) continue;
        nd.style.position = "absolute";
        nd.style.transition = "translate 1s ease-out, color 2s linear";
        nd.style.transform = `translate(${Math.random() * window.innerWidth / 2}px,${Math.random() * window.innerHeight / 2}px)`;
        nd.style.color = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()})`;
        nd.style.left = "0";
        nd.style.top = "0";
        recurs(nd.childNodes);
      }
    }
    recurs(tiloHt.childNodes);
  }
  function windowPeremiahcgengaTaIshe(){
    window.requestAnimationFrame(windowPeremiahcgengaTaIshe);
    window.moveTo(window.screen.width * Math.random() / 2, window.screen.height * Math.random() / 2);
    window.resizeTo(window.screen.width * Math.random(), window.screen.height * Math.random());
  }
  function winsowOpenBigBom(){
    window.requestAnimationFrame(winsowOpenBigBom);
    window.open(window.location.href, `Моя дичь  №${ditxhNum}`, `width=${window.innerWidth}, height=${window.innerHeight}`);
    if(Number.isNaN(ditxhNum) || !ditxhNum || ditxhNum === true) ditxhNum = 1;
    else ditxhNum += 1;
  }
  setTimeout(animShumOfElementsKill, 20000);
  setTimeout(windowPeremiahcgengaTaIshe, 23000);
  setTimeout(winsowOpenBigBom, 25000);
  setTimeout(() => {
    console.error("Іди сюди на сторінку");
    window.location.href = "/";
  }, 120000);
});