"use strict"


window.onload = function () {

    console.log("Я ЖИВОЙ!");
    const parallax = document.querySelector('.header');
    console.log(parallax);
    if (parallax) {
        parallax.addEventListener("mousemove", e=>{console.log(e);});
        
        // текст в параллаксе
        const content = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');


        //коэффициенты - чем меньше, тем сильнее движение
        const forClouds = 40;
        const forMountains = 10;

        //скорость анимации
        const speed = 0.05;
        
        //переменные позиций
        let positionX = 0, positionY = 0;
        let coordXpercent = 0, coordYpercent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXpercent - positionX;
            const distY = coordYpercent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);
        
            //передаём ситли
            clouds.style.cssText = `transform: translate(${positionX/forClouds}%,${positionY/forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX/forMountains}%,${positionY/forMountains}%);`;
        
            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

            parallax.addEventListener('mousemove', e =>{
                console.log("СЛУШАЮ");
                //получаем ширину и высоту блока с параллаксом
                const parallaxWidth = parallax.offsetWidth;
                const parallaxHeight = parallax.offsetHeight;
                console.log(parallaxWidth);
                console.log(parallaxHeight);

                //определчяем центр координат - картинки
                const coordX = e.pageX - parallaxWidth/2;
                const coordY = e.pageY - parallaxHeight/2;
                console.log(coordX);
                console.log(coordY);
                //Проценты от координат X и Y
                coordXpercent = coordX/parallaxWidth*100;
                coordYpercent = coordY/parallaxHeight*100;
                console.log(coordXpercent);
                console.log(coordYpercent);
            });


    }

}