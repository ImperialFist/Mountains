"use strict"


window.onload = function () {

    const parallax = document.querySelector('.parallax');
    console.log(parallax);
    if (parallax) {
        parallax.addEventListener("mousemove", e=>{console.log(e);});
        
        // текст в параллаксе
        const content = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');


        //коэффициенты - чем меньше, тем сильнее движение
        const forClouds = 30;
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

                //получаем ширину и высоту блока с параллаксом
                const parallaxWidth = parallax.offsetWidth;
                const parallaxHeight = parallax.offsetHeight;


                //определчяем центр координат - картинки
                const coordX = e.pageX - parallaxWidth/2;
                const coordY = e.pageY - parallaxHeight/2;

                //Проценты от координат X и Y
                coordXpercent = coordX/parallaxWidth*100;
                coordYpercent = coordY/parallaxHeight*100;

            });

            //parallax при скроле
            let tresholdSets = [];
            //treshold - порог при достижении каждого значения отрабатывает callback
            for (let i = 0; i <= 1.0; i+=0.005) {
                tresholdSets.push(i);
                
            }
            const callback = function (entries, observer) {
                const scrollTopPercent = window.pageYOffset/ parallax.offsetHeight * 100;
                setParallaxItemsStyle(scrollTopPercent);
            };

            const observer = new IntersectionObserver(callback, {threshold:tresholdSets});

            observer.observe(document.querySelector('.content'));

            function setParallaxItemsStyle(scrollTopPercent) {
                //значения отвечают за скорость скролла
                content.style.cssText = `transform: translate(0%,-${scrollTopPercent/5}%);`
                mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent/4}%);`
                
            }

    }

}