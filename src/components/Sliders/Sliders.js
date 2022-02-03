import {useState, useEffect} from "@wordpress/element";
import {Button} from "@wordpress/components";
import {RichText} from "@wordpress/block-editor";
import Swiper from "swiper";
import 'swiper/css';

const Sliders = (props) => {
    const [sliders, setSliders] = useState([]); // состояние слайдеров и установки
    let blockClassname = props.className; // класс блока
    let {slides} = props.attributes; // аттрибут slides, где будет передаваться каждый обьект

    const swiper = new Swiper(`.${blockClassname} .swiper`);
    // let left = document.querySelector( `.${blockClassname} .swiper-button-prev`);
    // left.addEventListener('click',()=>{
    //     swiper.slidePrev();
    // });
    // let right = document.querySelector(`.${blockClassname} .swiper-button-next`);
    // right.addEventListener('click',()=>{
    //     swiper.slideNext();
    // });


    useEffect(() => {
        setSliders(props.attributes.slides); // Установка данных в состояние если они есть
    }, [])

    useEffect(() => {
        props.setAttributes({slides: sliders}); // Обновление данных в атрибут
    }, [sliders])

    function addSlide() {
        setSliders([...sliders, {text: "Default"}]);
        swiper.slideNext();
    }

    let outputSliders = '';
    if (sliders.length > 0) {
        outputSliders = sliders.map((slider, i) => {
            return <div className="swiper-slide">
                <RichText
                    tagName="h2"
                    value={sliders[i].text}
                    onChange={(content) => {
                        // берем оставшиеся элементы, кроме текущих. Например это 2 элемент, то берем все элементы кроме 2
                        let newSliders = sliders.filter((slider, slideri) => {
                            return slideri != i;
                        })
                        // перемещаем данные в нужном месте по списку
                        newSliders.splice(i, 0, {text: content})
                        props.setAttributes({slides: newSliders});
                    }}
                />
            </div>
        })
    }

    return (
        <div className={blockClassname}>
            <div className="swiper">
                <div className="swiper-wrapper">
                    {outputSliders}
                </div>
                <div className="swiper-button-prev">налево</div>
                <div className="swiper-button-next">направо</div>
            </div>
            <Button onClick={addSlide} variant="primary">Add slide</Button>
        </div>
    );
};

export default Sliders;