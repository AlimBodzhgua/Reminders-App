import { FC, useState, useEffect, useRef } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';
import { Flex } from 'antd';

import {
	StyledMapContainer,
	StyledSpin,
} from './AppMap.styles';

interface AppMapProps {
	onLocationSelect?: (address: string) => void;
	initialLocation?: string;
	mapHeight?: string;
	mapWidth?: string;
	mapControls?: string[];
}

export const AppMap: FC<AppMapProps> = (props) => {
	const {
		onLocationSelect,
		initialLocation,
		mapHeight,
		mapWidth,
		mapControls,
	} = props;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const ymaps = useYMaps(['Map']);
	const mapRef = useRef<HTMLDivElement | null>(null);
	const placemarkRef = useRef<ymaps.Placemark | null>(null);

	const createPlacemark = (coords: number[]) => {
        return new ymaps!.Placemark(coords, {
            iconCaption: 'Searching...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    };

    const getAddress = async (coords: number[]) => {
        placemarkRef.current?.properties.set('iconCaption', 'Searching...');
        const geocodeResult = await ymaps?.geocode(coords); 

        if (geocodeResult) {
	        const firstGeoObject = geocodeResult.geoObjects.get(0);
	        const metaData = firstGeoObject.properties.get('metaDataProperty', {}); 
	        // @ts-ignore
	        const resultAddress: string = metaData.GeocoderMetaData.text;

	        placemarkRef.current?.properties.set('iconCaption', resultAddress);
	        if (onLocationSelect) {
	        	onLocationSelect(resultAddress);
	        }
        }
    };

    const onPlacemarkDragEnd = () => {
    	const placemarkCoords = placemarkRef.current?.geometry?.getCoordinates() 
    	if (placemarkCoords) {
            getAddress(placemarkCoords);
    	};
    };

    const onMapClick = (e: ymaps.IEvent<MouseEvent>, map: ymaps.Map) => {
    	const coords = e.get('coords');
    	if (placemarkRef.current) {
    		placemarkRef.current.geometry?.setCoordinates(coords);
    	} else {
		    placemarkRef.current = createPlacemark(coords);
		    map.geoObjects.add(placemarkRef.current);

		    placemarkRef.current.events.add('dragend', onPlacemarkDragEnd);
    	}
	    getAddress(coords);
    };

	useEffect(() => {
		if (!ymaps || !mapRef.current) {
			return;
		}

	    const myMap = new ymaps.Map(mapRef.current, {
			center: [55.76, 37.64],
			zoom: 10,
			controls: mapControls ? mapControls : [
				'zoomControl',
				'searchControl',
				'geolocationControl',
				'fullscreenControl',
			],
	    });

	    setIsLoading(false);

	    if (initialLocation) {
	        ymaps?.geocode(initialLocation).then((res) => {
	        	myMap.geoObjects.add(res.geoObjects);
	        }); 
	    } else {
	    	myMap.events.add('click', (e) => onMapClick(e, myMap));
	    }

	    return () => {
	    	placemarkRef.current = null;
	   		myMap.destroy();
	    }
	}, [ymaps]);

	return (
		<Flex justify='center' align='center'>
			<StyledSpin spinning={isLoading} />
			<StyledMapContainer
				ref={mapRef}
				$height={mapHeight}
				$width={mapWidth}
			/>
		</Flex>
	);
};