import React from 'react'
import ItemCarrousel from './ItemCarrousel'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Esqueleto from './Esqueleto';





export default function ItemListCarrousel({ items,loading }) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 625 },
            items: 4,
            slidesToSlide: 4
        },
        mobile: {
            breakpoint: { max: 625, min: 0 },
            items: 2,
            slidesToSlide: 2
        }
    };

    const skeletonItem = [1,2,3,4,5,6,7]

    return (

        <div>
            <Carousel
                responsive={responsive}
                showDots={false}
                infinite={true}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                draggable={true}
            >
                {loading ?
                skeletonItem.map((item) => (
                    <div key={item}>
                        <Esqueleto  />
                    </div>
                ))
                :
                items.map((item) => (
                    <div key={item.id}>
                        <ItemCarrousel item={item} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

