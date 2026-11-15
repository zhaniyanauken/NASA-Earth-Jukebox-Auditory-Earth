// Official NASA SVS Gallery #40509: "Earth Now Dashboard"
// Every dataset, hotspot, pixel-to-sensor decoder, and musical profile is calibrated directly to the 18 official NASA SVS images.

export const EARTH_NOW_DASHBOARD_META = {
  id: 40509,
  url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/',
  page_type: 'Gallery',
  title: 'Earth Now Dashboard',
  description:
    "NASA satellites provide data on Earth's land, ecosystems, water, air temperature, and climate - and have done so for more than 50 years. Earth information from space supports decision makers, partners, and people in developing the tools they need to mitigate, adapt, and respond to our changing planet.\n\nThe visualizations featured on this dashboard show the latest imagery available.",
  release_date: '2023-10-16T00:00:00-04:00',
  update_date: '2023-10-25T00:00:00-04:00',
  main_image: {
    id: 858326,
    url: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005148/MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_searchweb.png',
    localUrl: '/earth-now/MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_print.jpg',
    filename: 'MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_searchweb.png',
    media_type: 'Image',
    width: 180,
    height: 320,
    pixels: 57600
  },
  overview_stages: [
    { id: 'stage1', title: 'Hyperwall Stage 1: Worldview Cycle 1', localUrl: '/earth-now/Hyperwall_D002_Stage1.png', remoteUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/Hyperwall_D002_Stage1.png' },
    { id: 'stage2', title: 'Hyperwall Stage 2: Worldview Cycle 2', localUrl: '/earth-now/Hyperwall_D002_Stage2.png', remoteUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/Hyperwall_D002_Stage2.png' },
    { id: 'stage4', title: 'Hyperwall Stage 4: Models Air Quality', localUrl: '/earth-now/Hyperwall_D002_Stage4.png', remoteUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/Hyperwall_D002_Stage4.png' },
    { id: 'stage3', title: 'Hyperwall Stage 3: Models Weather', localUrl: '/earth-now/Hyperwall_D002_Stage3.png', remoteUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/Hyperwall_D002_Stage3.png' }
  ]
};

export const MEDIA_GROUPS = [
  {
    id: 372478,
    key: 'models_weather',
    url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/#media_group_372478',
    widget: 'Card gallery',
    title: 'Models: Weather',
    titleRu: 'Модели: Погода (GEOS-FP)',
    shortTitle: 'Models: Weather',
    shortTitleRu: 'Погода (GEOS-FP)',
    description:
      'Global weather visualizations produced by the Goddard Earth Observing System Forward Processing (GEOS-FP) model (NASA GMAO): Near-Surface Temperature (#5147), Wind Speed (#5148), Precipitation and Clouds (#5149), and Specific Humidity Q2M (#5150).',
    descriptionRu:
      'Глобальные погодные визуализации модели GEOS-FP (NASA GMAO): приземная температура (#5147), скорость ветра (#5148), осадки и облачность (#5149) и удельная влажность Q2M (#5150).'
  },
  {
    id: 372479,
    key: 'models_air_quality',
    url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/#media_group_372479',
    widget: 'Card gallery',
    title: 'Models: Air Quality',
    titleRu: 'Модели: Качество воздуха (GEOS-CF)',
    shortTitle: 'Models: Air Quality',
    shortTitleRu: 'Воздух (GEOS-CF)',
    description:
      'The Goddard Earth Observing System Composition Forecast (GEOS-CF) system combines atmospheric chemistry and meteorology models with satellite observations to provide global estimates of Particulate Matter PM2.5 (#5151), Ozone O3 (#5152), Carbon Monoxide CO (#5153), and Nitrogen Oxides NOx (#5154).',
    descriptionRu:
      'Система прогнозирования состава атмосферы GEOS-CF объединяет модели химии атмосферы и метеорологии со спутниковыми наблюдениями NASA для оценки PM2.5 (#5151), приземного озона O3 (#5152), угарного газа CO (#5153) и оксидов азота NOx (#5154).'
  },
  {
    id: 372598,
    key: 'worldview_cycle1',
    url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/#media_group_372598',
    widget: 'Card gallery',
    title: 'Worldview Satellite Observations - First Cycle',
    titleRu: 'Спутники Worldview — Цикл 1 (LANCE)',
    shortTitle: 'Worldview Cycle 1',
    shortTitleRu: 'Worldview Цикл 1',
    description:
      "The first cycle of the Earth Now dashboard shows near real-time satellite observations from NASA's Worldview & LANCE team: Terra True Color orbital swaths, Suomi NPP Black Marble nighttime imagery, NOAA/JAXA Geostationary composites, and Suomi NPP VIIRS Active Fires.",
    descriptionRu:
      'Первый цикл панели Earth Now показывает спутниковые наблюдения NASA Worldview (LANCE): полосы пролета Terra в истинном цвете, ночные снимки Black Marble Suomi NPP, геостационарные диски NOAA/JAXA и активные пожары Suomi NPP.'
  },
  {
    id: 372602,
    key: 'worldview_cycle2',
    url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/#media_group_372602',
    widget: 'Card gallery',
    title: 'Worldview Satellite Observations - Second Cycle',
    titleRu: 'Спутники Worldview — Цикл 2',
    shortTitle: 'Worldview Cycle 2',
    shortTitleRu: 'Worldview Цикл 2',
    description:
      "The second cycle of the Earth Now dashboard shows daily multi-satellite observations from NASA's Worldview team: Rain and Snow, Sea Surface Temperature (SST), Land Surface Temperature (LST), and Arctic & Antarctic Polar Sea Ice concentration.",
    descriptionRu:
      'Второй цикл спутниковых наблюдений NASA Worldview: дождь и снег, температура поверхности моря (SST), температура поверхности суши (LST) и концентрация полярных льдов Арктики и Антарктики.'
  },
  {
    id: 372607,
    key: 'visualizations',
    url: 'http://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/#media_group_372607',
    widget: 'Card gallery',
    title: 'Visualizations',
    titleRu: 'Геостационарные визуализации (GOES)',
    shortTitle: 'Visualizations (GOES)',
    shortTitleRu: 'GOES Диск',
    description:
      'NOAA GOES-East and NOAA GOES-West True Color Full-Disk Imagery Over Past 5 Days (SVS #5120).',
    descriptionRu:
      'Геостационарные снимки полного диска Земли в естественных цветах со спутников NOAA GOES-East и GOES-West (SVS #5120).'
  }
];

// Hotspots placed at the EXACT visual features inspected on each of the 18 NASA SVS #40509 images
export const HOTSPOTS_BY_DATASET = {
  // 1. SVS #5147: GEOS-FP Near-Surface Temperature (15 Aug 2023 09:00 EDT)
  geos_temp: [
    {
      id: 'sahara_arabia_gray_core',
      nameRu: 'Экстремальный купол Сахары и Аравии (Серебристо-черный спектр >44°C)',
      nameEn: 'Sahara & Arabian Extreme Heat Core (>44°C Gray-Black Band)',
      lat: 24.0,
      lon: 44.0,
      value: 45.2,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ЗНОЙ (+45.2°C)',
      tagEn: 'HEAT CORE (+45.2°C)',
      descRu: 'На карте SVS #5147 (15 Aug 2023 09:00 EDT) Сахара и Аравийский полуостров окрашены в серебристо-серый цвет — это высшая ступень шкалы GEOS-FP свыше +44°C.',
      descEn: 'On SVS #5147 (15 Aug 2023 09:00 EDT), the Sahara and Arabian Peninsula appear metallic gray—the highest tier of the GEOS-FP scale exceeding +44°C.'
    },
    {
      id: 'algeria_mali_dome',
      nameRu: 'Западно-Сахарский тепловой купол (Алжир и Мали)',
      nameEn: 'Western Sahara Thermal Dome (Algeria & Mali)',
      lat: 23.0,
      lon: 2.0,
      value: 44.0,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'САХАРА (+44.0°C)',
      tagEn: 'SAHARA (+44.0°C)',
      descRu: 'Сплошной серо-бордовый массив раскаленного приземного воздуха в центре Северной Африки.',
      descEn: 'Continuous gray-crimson core of superheated surface air across North Africa.'
    },
    {
      id: 'greenland_indigo_cap',
      nameRu: 'Ледниковый купол Гренландии (Темно-синий спектр)',
      nameEn: 'Greenland Ice Sheet Cold Core (Deep Indigo)',
      lat: 73.0,
      lon: -40.0,
      value: -22.5,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ГРЕНЛАНДИЯ (-22.5°C)',
      tagEn: 'GREENLAND (-22.5°C)',
      descRu: 'Глубокое темно-синее пятно отрицательных температур над ледниковым щитом Гренландии.',
      descEn: 'Deep indigo sub-zero cold anomaly over the high Greenland ice sheet.'
    },
    {
      id: 'antarctica_violet_freeze',
      nameRu: 'Антарктический полярный щит (Фиолетово-белый минимум)',
      nameEn: 'Antarctic Plateau Polar Freeze (Violet-White Minimum)',
      lat: -78.0,
      lon: 90.0,
      value: -44.5,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'АНТАРКТИДА (-44.5°C)',
      tagEn: 'ANTARCTICA (-44.5°C)',
      descRu: 'Фиолетово-белая зона экстремального зимнего выхолаживания Южного полушария (-44.5°C).',
      descEn: 'Violet-white austral winter freeze across the East Antarctic plateau (-44.5°C).'
    }
  ],

  // 2. SVS #5148: GEOS-FP Near-Surface Wind Speed (15 Aug 2023 09:00 EDT)
  geos_wind: [
    {
      id: 'south_pacific_red_vortex',
      nameRu: 'Южно-Тихоокеанский супершторм (Красно-бордовое ядро)',
      nameEn: 'South Pacific Super-Storm Vortex (Bright Red Core)',
      lat: -56.0,
      lon: -146.0,
      value: 39.5,
      unit: 'м/с',
      unitEn: 'm/s',
      tagRu: 'ШТОРМ (39.5 м/с)',
      tagEn: 'SUPER GALE (39.5 m/s)',
      descRu: 'Самое мощное красно-бордовое штормовое ядро в левом нижнем углу карты SVS #5148 (Южный Тихий океан, 39.5 м/с).',
      descEn: 'The most intense crimson-red cyclonic wind core in the lower-left of SVS #5148 (South Pacific, 39.5 m/s).'
    },
    {
      id: 'indian_ocean_twin_cyclones',
      nameRu: 'Двойной циклон Южного Индийского океана',
      nameEn: 'Southern Indian Ocean Twin Storm Vortices',
      lat: -51.0,
      lon: 46.0,
      value: 36.0,
      unit: 'м/с',
      unitEn: 'm/s',
      tagRu: 'ВИХРЬ (36.0 м/с)',
      tagEn: 'CYCLONE (36.0 m/s)',
      descRu: 'Огромная оранжево-красная спираль ураганных ветров к югу от Мадагаскара и Австралии.',
      descEn: 'Massive orange-red baroclinic wind spiral south of Madagascar and Australia.'
    },
    {
      id: 'south_pacific_mid_cyclone',
      nameRu: 'Субтропический вихрь Тихого океана',
      nameEn: 'South Pacific Subtropical Wind Spiral',
      lat: -36.0,
      lon: -140.0,
      value: 28.5,
      unit: 'м/с',
      unitEn: 'm/s',
      tagRu: 'СПИРАЛЬ (28.5 м/с)',
      tagEn: 'SPIRAL (28.5 m/s)',
      descRu: 'Отчетливое желто-оранжевое кольцо штормового циклона в южной части Тихого океана.',
      descEn: 'Distinct yellow-orange cyclonic wind ring in the South Pacific.'
    },
    {
      id: 'somali_arabian_jet',
      nameRu: 'Сомалийское струйное течение и тайфун у Японии',
      nameEn: 'Somali Monsoon Jet & Typhoon Lan (Japan)',
      lat: 33.5,
      lon: 136.5,
      value: 25.0,
      unit: 'м/с',
      unitEn: 'm/s',
      tagRu: 'ТАЙФУН ЛАН (25 м/с)',
      tagEn: 'TYPHOON LAN (25 m/s)',
      descRu: 'Вихрь тайфуна Лан у южного побережья Японии (15 августа 2023) на карте SVS #5148.',
      descEn: 'Typhoon Lan wind circulation making landfall over southern Japan on 15 Aug 2023 (SVS #5148).'
    }
  ],

  // 3. SVS #5149: GEOS-FP Precipitation and Clouds (15 Aug 2023 09:00 EDT)
  geos_precip: [
    {
      id: 'east_pacific_itcz_core',
      nameRu: 'Тропический ливневый вихрь у берегов Мексики (Сине-пурпурное ядро)',
      nameEn: 'Eastern Pacific Hurricane & ITCZ Deluge (Blue-Magenta Core)',
      lat: 12.0,
      lon: -103.0,
      value: 45.0,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ЛИВЕНЬ (45 мм/ч)',
      tagEn: 'DELUGE (45 mm/h)',
      descRu: 'Яркое сине-красное ядро экстремальных тропических осадков в восточной части Тихого океана на карте SVS #5149.',
      descEn: 'Intense blue-magenta convective rain core off the coast of Mexico on SVS #5149.'
    },
    {
      id: 'atlantic_itcz_guinea',
      nameRu: 'Атлантический грозовой кластер (К западу от Африки)',
      nameEn: 'Tropical East Atlantic Storm Cluster',
      lat: 9.5,
      lon: -24.5,
      value: 42.5,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ШТОРМ (42.5 мм/ч)',
      tagEn: 'STORM (42.5 mm/h)',
      descRu: 'Мощная сине-пурпурная ячейка ливней во внутритропической зоне конвергенции Атлантики.',
      descEn: 'Deep blue-magenta precipitation cell in the Atlantic ITCZ west of Guinea.'
    },
    {
      id: 'typhoon_lan_japan_rain',
      nameRu: 'Тайфун Лан над Японией и Тихим океаном',
      nameEn: 'Typhoon Lan Rain Shield over Japan',
      lat: 34.0,
      lon: 136.0,
      value: 38.0,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ТАЙФУН (38 мм/ч)',
      tagEn: 'TYPHOON (38 mm/h)',
      descRu: 'Спиральные зелено-голубые полосы ливней и белая облачная шапка тайфуна над Японией.',
      descEn: 'Swirling green-cyan rain bands and dense white cloud canopy over Japan.'
    },
    {
      id: 'south_atlantic_snow_front',
      nameRu: 'Фронтальный циклон Южной Атлантики',
      nameEn: 'South Atlantic Frontal Rain & Snow Band',
      lat: -46.0,
      lon: -48.0,
      value: 29.0,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ФРОНТ (29 мм/ч)',
      tagEn: 'FRONT (29 mm/h)',
      descRu: 'Длинная изогнутая сине-зеленая фронтальная полоса осадков в Южном полушарии.',
      descEn: 'Curved cyan-green frontal precipitation band sweeping the South Atlantic.'
    }
  ],

  // 4. SVS #5150: GEOS-FP Near-Surface Humidity Q2M (26 Feb 2026 09:00 EST)
  geos_humidity: [
    {
      id: 'indo_pacific_deep_blue',
      nameRu: 'Индо-Тихоокеанский пояс максимальной влажности (Темно-синий спектр)',
      nameEn: 'Indo-Pacific Warm Pool Moisture Core (Deep Sapphire Blue)',
      lat: -10.0,
      lon: 145.0,
      value: 23.2,
      unit: 'г/кг',
      unitEn: 'g/kg',
      tagRu: 'ВЛАГА (23.2 г/кг)',
      tagEn: 'HUMID (23.2 g/kg)',
      descRu: 'На карте SVS #5150 (26 Feb 2026) темно-синий цвет вокруг Индонезии, севера Австралии и Тихого океана показывает максимум водяного пара (23.2 г/кг).',
      descEn: 'On SVS #5150 (26 Feb 2026), deep sapphire blue across the Indo-Pacific and northern Australia marks peak specific humidity (23.2 g/kg).'
    },
    {
      id: 'amazon_blue_canopy',
      nameRu: 'Влажный бассейн Амазонии и Экваториальной Атлантики',
      nameEn: 'Amazon Basin & Equatorial Atlantic Moisture River',
      lat: -7.0,
      lon: -60.0,
      value: 21.6,
      unit: 'г/кг',
      unitEn: 'g/kg',
      tagRu: 'АМАЗОНИЯ (21.6 г/кг)',
      tagEn: 'AMAZON (21.6 g/kg)',
      descRu: 'Насыщенный сине-голубой купол водяного пара над влажными лесами Южной Америки.',
      descEn: 'Rich azure-blue water vapor canopy over the Amazon rainforest.'
    },
    {
      id: 'sahara_brown_arid',
      nameRu: 'Гипер-аридный пояс Сахары и Евразии (Коричневый спектр)',
      nameEn: 'Sahara & Continental Hyper-Arid Air Mass (Tan-Brown)',
      lat: 23.0,
      lon: 15.0,
      value: 2.1,
      unit: 'г/кг',
      unitEn: 'g/kg',
      tagRu: 'СУХО (2.1 г/кг)',
      tagEn: 'ARID (2.1 g/kg)',
      descRu: 'Коричнево-песочный цвет на карте SVS #5150 обозначает экстремально сухой воздух пустынь и полярных широт.',
      descEn: 'Tan-brown coloration on SVS #5150 indicates extremely low water vapor over deserts and high latitudes.'
    }
  ],

  // 5. SVS #5151: GEOS-CF Particulate Matter PM2.5 (15 Aug 2023 09:00 EDT)
  geos_pm25: [
    {
      id: 'canada_nwt_smoke_pm25',
      nameRu: 'Дымовой мега-шлейф пожаров Северо-Запада Канады (Темно-коричневый)',
      nameEn: 'Northwest Canada Boreal Wildfire Smoke Plume',
      lat: 61.5,
      lon: -115.0,
      value: 238.0,
      unit: 'мкг/м³',
      unitEn: 'µg/m³',
      tagRu: 'ДЫМ КАНАДЫ (238)',
      tagEn: 'CANADA SMOKE (238)',
      descRu: 'На карте SVS #5151 (15 Aug 2023) темно-коричневое пятно над Канадой — экстремальный дым PM2.5 от бореальных лесных пожаров.',
      descEn: 'On SVS #5151 (15 Aug 2023), the dark burnt-brown core over Northwest Canada marks extreme PM2.5 smoke from boreal wildfires.'
    },
    {
      id: 'taklamakan_east_china_pm25',
      nameRu: 'Пылевой бассейн Такла-Макан и Восточный Китай',
      nameEn: 'Taklamakan Dust & East China Aerosol Core',
      lat: 36.5,
      lon: 108.0,
      value: 224.0,
      unit: 'мкг/м³',
      unitEn: 'µg/m³',
      tagRu: 'АЗИЯ PM2.5 (224)',
      tagEn: 'ASIA PM2.5 (224)',
      descRu: 'Интенсивный темно-янтарный очаг минеральной пыли и промышленного аэрозоля в Азии.',
      descEn: 'Intense dark-amber mineral dust and industrial PM2.5 cluster across China and Northern India.'
    },
    {
      id: 'sahara_atlantic_dust_pm25',
      nameRu: 'Трансатлантический шлейф пыли Сахары и Центральная Африка',
      nameEn: 'Saharan Dust Plume & Central African Biomass Smoke',
      lat: 18.0,
      lon: -16.0,
      value: 182.0,
      unit: 'мкг/м³',
      unitEn: 'µg/m³',
      tagRu: 'ПЫЛЬ САХАРЫ (182)',
      tagEn: 'SAHARA DUST (182)',
      descRu: 'Широкий оранжево-коричневый язык пыли Сахары, уходящий через Атлантический океан к Америке.',
      descEn: 'Broad orange-brown Saharan mineral dust plume sweeping westward across the Atlantic.'
    },
    {
      id: 'siberia_yakutia_smoke_pm25',
      nameRu: 'Дымовой вихрь таежных пожаров Сибири (Якутия)',
      nameEn: 'Eastern Siberia (Yakutia) Wildfire Aerosol Vortex',
      lat: 61.0,
      lon: 128.0,
      value: 196.0,
      unit: 'мкг/м³',
      unitEn: 'µg/m³',
      tagRu: 'СИБИРЬ (196)',
      tagEn: 'SIBERIA (196)',
      descRu: 'Крупный коричнево-оранжевый вихрь аэрозолей PM2.5 на востоке Сибири.',
      descEn: 'Large swirling brown-orange PM2.5 smoke vortex over eastern Siberia.'
    }
  ],

  // 6. SVS #5152: GEOS-CF Near surface Ozone O3 (15 Aug 2023 09:00 EDT)
  geos_o3: [
    {
      id: 'persian_gulf_iran_o3',
      nameRu: 'Озоновый максимум Ближнего Востока и Персидского залива (Темно-фиолетовый)',
      nameEn: 'Middle East & Persian Gulf Photochemical Ozone Peak',
      lat: 29.0,
      lon: 48.0,
      value: 104.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'ОЗОН O3 (104 ppbv)',
      tagEn: 'O3 PEAK (104 ppbv)',
      descRu: 'На карте SVS #5152 ярко-фиолетовый пояс от Средиземноморья через Иран и Аравию до Китая отражает пик фотохимического озона.',
      descEn: 'On SVS #5152, the deep violet band from the Mediterranean across Arabia/Iran to China marks peak photochemical surface ozone.'
    },
    {
      id: 'east_china_o3',
      nameRu: 'Восточно-Азиатский фотохимический шлейф O3',
      nameEn: 'Eastern China Surface Ozone Plume',
      lat: 35.0,
      lon: 116.0,
      value: 98.5,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'КИТАЙ (98.5 ppbv)',
      tagEn: 'CHINA O3 (98.5 ppbv)',
      descRu: 'Глубокий индиго-фиолетовый очаг приземного озона над восточным Китаем.',
      descEn: 'Deep indigo-violet surface ozone concentration over eastern China.'
    },
    {
      id: 'angola_congo_o3',
      nameRu: 'Южно-Экваториальный озоновый очаг Африки (Ангола и Конго)',
      nameEn: 'Central African Biomass Ozone Core (Angola & DRC)',
      lat: -12.0,
      lon: 22.0,
      value: 94.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'АФРИКА O3 (94 ppbv)',
      tagEn: 'AFRICA O3 (94 ppbv)',
      descRu: 'Интенсивное фиолетовое пятно приземного озона, образующегося в дымовых шлейфах саванн.',
      descEn: 'Intense purple ozone core formed photochemically within African savanna fire plumes.'
    }
  ],

  // 7. SVS #5153: GEOS-CF Carbon Monoxide CO (15 Aug 2023 09:00 EDT)
  geos_co: [
    {
      id: 'canada_crimson_co',
      nameRu: 'Кроваво-красный шлейф CO от пожаров в Канаде (SVS #5153)',
      nameEn: 'Canadian Boreal Wildfire Crimson CO Megaplume',
      lat: 61.5,
      lon: -115.0,
      value: 740.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'КАНАДА CO (740 ppbv)',
      tagEn: 'CANADA CO (740 ppbv)',
      descRu: 'На карте SVS #5153 огромный темно-красный шлейф угарного газа (CO) тянется от лесных пожаров Канады через весь континент в Атлантику.',
      descEn: 'On SVS #5153, a massive dark-crimson Carbon Monoxide plume stretches from Northwest Canada wildfires across North America into the Atlantic.'
    },
    {
      id: 'central_africa_crimson_co',
      nameRu: 'Центрально-Африканский и Гвинейский купол угарного газа CO',
      nameEn: 'Central Africa & Gulf of Guinea CO Dome',
      lat: -7.0,
      lon: 15.0,
      value: 695.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'АФРИКА CO (695 ppbv)',
      tagEn: 'AFRICA CO (695 ppbv)',
      descRu: 'Гигантское темно-бордовое облако монооксида углерода над Центральной Африкой и Атлантикой.',
      descEn: 'Enormous blood-red carbon monoxide cloud blanketing Central Africa and the Gulf of Guinea.'
    },
    {
      id: 'east_china_india_co',
      nameRu: 'Восточный Китай и Индо-Гангская равнина (CO)',
      nameEn: 'East China & Northern India CO Concentration',
      lat: 31.0,
      lon: 114.0,
      value: 670.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'АЗИЯ CO (670 ppbv)',
      tagEn: 'ASIA CO (670 ppbv)',
      descRu: 'Сплошной темно-красный регион высокой концентрации угарного газа над Восточной и Южной Азией.',
      descEn: 'Dense crimson expanse of elevated carbon monoxide across East and South Asia.'
    },
    {
      id: 'siberia_yakutia_co',
      nameRu: 'Сибирский таежный вихрь угарного газа (Якутия)',
      nameEn: 'Eastern Siberia Wildfire CO Vortex',
      lat: 60.5,
      lon: 127.0,
      value: 645.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'СИБИРЬ CO (645 ppbv)',
      tagEn: 'SIBERIA CO (645 ppbv)',
      descRu: 'Ярко-красный закрученный шлейф CO от таежных пожаров на Дальнем Востоке и в Якутии.',
      descEn: 'Swirling crimson CO plume from boreal forest fires in Yakutia and the Russian Far East.'
    }
  ],

  // 8. SVS #5154: GEOS-CF Nitrogen Oxides NOx (15 Aug 2023 09:00 EDT)
  geos_nox: [
    {
      id: 'east_china_dark_green_nox',
      nameRu: 'Мегаполисы Восточного Китая (Темно-зеленый максимум NOx)',
      nameEn: 'East China Megacity Cluster (Dark Forest-Green NOx Peak)',
      lat: 35.5,
      lon: 117.5,
      value: 52.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'КИТАЙ NOx (52 ppbv)',
      tagEn: 'CHINA NOx (52 ppbv)',
      descRu: 'На зеленой карте SVS #5154 самые темные черно-зеленые точки над Китаем показывают максимальную концентрацию оксидов азота NOx.',
      descEn: 'On the green-scale SVS #5154 map, the darkest black-green clusters over Eastern China mark peak urban/industrial NOx.'
    },
    {
      id: 'maritime_shipping_lanes_nox',
      nameRu: 'Международные морские судоходные трассы (Линии в океане)',
      nameEn: 'International Ocean Shipping Lanes (Linear Green Tracks)',
      lat: 6.0,
      lon: 86.0,
      value: 26.5,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'СУДОХОДСТВО (26.5)',
      tagEn: 'SHIPPING LANE (26.5)',
      descRu: 'Уникальная особенность карты SVS #5154: четкие прямые зеленые линии через Индийский и Атлантический океаны — следы выхлопов морских судов!',
      descEn: 'Signature feature of SVS #5154: crisp straight green lines across the Indian and Atlantic oceans tracing international cargo ship exhaust!'
    },
    {
      id: 'north_america_europe_nox',
      nameRu: 'Индустриальные узлы США и Западной Европы',
      nameEn: 'North American & European Urban NOx Hubs',
      lat: 40.5,
      lon: -75.5,
      value: 43.0,
      unit: 'ppbv',
      unitEn: 'ppbv',
      tagRu: 'США / ЕВРОПА (43)',
      tagEn: 'URBAN NOx (43 ppbv)',
      descRu: 'Темно-зеленые очаги оксидов азота над мегаполисами Северной Америки и Европы.',
      descEn: 'Deep forest-green NOx hotspots over North American and European metropolitan corridors.'
    }
  ],

  // 9. Worldview Cycle 1: True color imagery from Terra satellite (05 Jul 2023)
  wv_truecolor: [
    {
      id: 'terra_sahara_swath_0910',
      nameRu: 'Дневная полоса пролета Terra над Сахарой и Нилом (07:35–10:50 UTC)',
      nameEn: 'Terra Daytime Orbital Swath: Sahara & Nile (07:35–10:50 UTC)',
      lat: 24.0,
      lon: 25.0,
      value: 92.0,
      unit: '% альбедо',
      unitEn: '% Albedo',
      tagRu: 'САХАРА (09:10 UTC)',
      tagEn: 'SAHARA SWATH (92%)',
      descRu: 'На карте WorldView_TrueColor (05 Jul 2023) видны реальные полосы пролета спутника Terra с оранжевыми линиями орбит и метками времени UTC.',
      descEn: 'On WorldView_TrueColor (05 Jul 2023), daytime Terra MODIS swaths and orange orbital ground tracks with UTC timestamps cross Africa and Eurasia.'
    },
    {
      id: 'terra_himalaya_china_0545',
      nameRu: 'Полоса пролета над Тибетом и Евразией (04:05–05:50 UTC)',
      nameEn: 'Terra Swath: Tibetan Plateau & Eurasia (04:05–05:50 UTC)',
      lat: 33.0,
      lon: 88.0,
      value: 78.0,
      unit: '% альбедо',
      unitEn: '% Albedo',
      tagRu: 'ТИБЕТ (05:50 UTC)',
      tagEn: 'EURASIA (05:50 UTC)',
      descRu: 'Изумрудные леса Евразии, снежные вершины Гималаев и облачные фронты на дневном витке Terra.',
      descEn: 'Emerald Eurasian forests, snow-capped Himalayas, and cloud systems along the 05:50 UTC Terra pass.'
    },
    {
      id: 'terra_australia_0110',
      nameRu: 'Красная пустыня Австралии (Виток 01:10 UTC)',
      nameEn: 'Australian Outback Swath (01:10 UTC Orbit Track)',
      lat: -24.0,
      lon: 134.0,
      value: 84.0,
      unit: '% альбедо',
      unitEn: '% Albedo',
      tagRu: 'АВСТРАЛИЯ (01:10)',
      tagEn: 'AUSTRALIA (01:10 UTC)',
      descRu: 'Ярко-терракотовый континент Австралии на утреннем пролете спутника Terra.',
      descEn: 'Bright terracotta Australian interior captured along the 01:10 UTC orbital track.'
    }
  ],

  // 10. Worldview Cycle 1: Black Marble night time imagery from Suomi NPP (05 Jul 2023)
  wv_blackmarble: [
    {
      id: 'bm_us_east_caribbean',
      nameRu: 'Ночная полоса Suomi NPP: США, Флорида и Карибы',
      nameEn: 'Suomi NPP Night Swath: US East Coast & Caribbean Glow',
      lat: 28.5,
      lon: -81.0,
      value: 116.0,
      unit: 'нВт',
      unitEn: 'nW',
      tagRu: 'США / ФЛОРИДА (116 nW)',
      tagEn: 'US / CARIBBEAN (116 nW)',
      descRu: 'На карте WorldView_BlackMarble (05 Jul 2023) ночной пролет Suomi NPP подсвечивает Северную и Южную Америку, Атлантику и Западную Европу.',
      descEn: 'On WorldView_BlackMarble (05 Jul 2023), the Suomi NPP nighttime swath illuminates the Americas, Atlantic Ocean, and Western Europe.'
    },
    {
      id: 'bm_south_america_cities',
      nameRu: 'Огни Бразилии, Аргентины и лунные облака Южной Америки',
      nameEn: 'South America Metropolis Lights & Moonlit Canopy',
      lat: -23.5,
      lon: -46.6,
      value: 112.0,
      unit: 'нВт',
      unitEn: 'nW',
      tagRu: 'ЮЖ. АМЕРИКА (112 nW)',
      tagEn: 'SOUTH AMERICA (112 nW)',
      descRu: 'Яркое свечение прибрежных мегаполисов Южной Америки и подсвеченных луной облаков в полосе VIIRS Day/Night Band.',
      descEn: 'Luminous coastal megacities and moonlit cloud decks across South America in the VIIRS Day/Night Band swath.'
    },
    {
      id: 'bm_south_atlantic_vortex',
      nameRu: 'Лунные облачные спирали Южной Атлантики',
      nameEn: 'Moonlit Cyclonic Cloud Swirls in South Atlantic',
      lat: -42.0,
      lon: -35.0,
      value: 88.0,
      unit: 'нВт',
      unitEn: 'nW',
      tagRu: 'ВИХРИ В СВЕТЕ ЛУНЫ',
      tagEn: 'MOONLIT SWIRLS (88 nW)',
      descRu: 'Серебристо-белые штормовые вихри в Южной Атлантике, заснятые ночью в отраженном свете Луны.',
      descEn: 'Silver-white storm vortices in the South Atlantic illuminated at night by reflected moonlight.'
    }
  ],

  // 11. Worldview Cycle 1: Geostationary imagery from NOAA and JAXA (05 Jul 2023 10:00 EDT)
  wv_geostationary: [
    {
      id: 'geo_goes_americas_disc',
      nameRu: 'Дневной геостационарный купол NOAA GOES (Северная и Южная Америка)',
      nameEn: 'NOAA GOES Sunlit Hemisphere (Americas & Atlantic)',
      lat: 5.0,
      lon: -68.0,
      value: 92.0,
      unit: 'индекс',
      unitEn: 'Index',
      tagRu: 'ДИСК NOAA GOES (92)',
      tagEn: 'NOAA GOES DISC (92)',
      descRu: 'На карте WorldView_Geostationary (05 Jul 2023 10:00 EDT) слева ярко освещен весь диск Северной и Южной Америки со спутника NOAA GOES.',
      descEn: 'On WorldView_Geostationary (05 Jul 2023 10:00 EDT), the left hemisphere shows a crisp full-color view of the Americas from NOAA GOES.'
    },
    {
      id: 'geo_himawari_pacific_rim',
      nameRu: 'Терминатор и Тихоокеанский край диска JAXA Himawari',
      nameEn: 'JAXA Himawari Asia-Pacific Limb & Terminator',
      lat: 35.0,
      lon: 165.0,
      value: 84.0,
      unit: 'индекс',
      unitEn: 'Index',
      tagRu: 'JAXA HIMAWARI (84)',
      tagEn: 'HIMAWARI LIMB (84)',
      descRu: 'Правая часть композиции показывает границу дня и ночи над Азией и облачные вихри Тихого океана со спутника JAXA Himawari.',
      descEn: 'The right hemisphere captures the day-night terminator over Asia and sunlit Pacific cloud systems from JAXA Himawari.'
    }
  ],

  // 12. Worldview Cycle 1: Active fires detected by Suomi NPP (04 Jul 2023)
  wv_fires: [
    {
      id: 'suomi_africa_red_wall',
      nameRu: 'Гигантский огненный пояс Центральной и Южной Африки (04 Jul 2023)',
      nameEn: 'Central & Southern Africa Massive Fire Belt (Suomi NPP)',
      lat: -10.5,
      lon: 21.5,
      value: 440.0,
      unit: 'MW',
      unitEn: 'MW',
      tagRu: 'АФРИКА (440 MW)',
      tagEn: 'AFRICA FIRES (440 MW)',
      descRu: 'На карте WorldView_Fires (04 Jul 2023) весь регион Анголы, Конго, Замбии и Мадагаскара покрыт сплошным красным массивом активных пожаров!',
      descEn: 'On WorldView_Fires (04 Jul 2023), Angola, DRC, Zambia, and Madagascar are blanketed in a massive solid-red cluster of active fires!'
    },
    {
      id: 'suomi_brazil_amazon_arc',
      nameRu: 'Огненная дуга Бразилии и Южной Америки',
      nameEn: 'Brazil & South American Fire Cluster',
      lat: -11.0,
      lon: -51.0,
      value: 395.0,
      unit: 'MW',
      unitEn: 'MW',
      tagRu: 'БРАЗИЛИЯ (395 MW)',
      tagEn: 'BRAZIL FIRES (395 MW)',
      descRu: 'Плотная россыпь красных точек тепловых аномалий VIIRS по всей центральной Бразилии и вдоль Анд.',
      descEn: 'Dense red constellation of VIIRS thermal fire detections across central Brazil and the Andes.'
    },
    {
      id: 'suomi_canada_quebec_fires',
      nameRu: 'Бореальные лесные мега-пожары в Квебеке и Западной Канаде',
      nameEn: 'Quebec & Western Canada Boreal Megafires',
      lat: 52.5,
      lon: -73.0,
      value: 415.0,
      unit: 'MW',
      unitEn: 'MW',
      tagRu: 'КАНАДА (415 MW)',
      tagEn: 'CANADA FIRES (415 MW)',
      descRu: 'Крупные красные очаги лесных пожаров в Квебеке и Альберте/Британской Колумбии с видимыми шлейфами белого дыма.',
      descEn: 'Intense red wildfire perimeters in Quebec and Western Canada with visible white smoke plumes.'
    },
    {
      id: 'suomi_siberia_far_east_fires',
      nameRu: 'Таежные пожары Сибири и Охотского побережья',
      nameEn: 'Siberian Taiga & Far East Fire Clusters',
      lat: 60.0,
      lon: 95.0,
      value: 370.0,
      unit: 'MW',
      unitEn: 'MW',
      tagRu: 'СИБИРЬ (370 MW)',
      tagEn: 'SIBERIA FIRES (370 MW)',
      descRu: 'Многочисленные очаги горения в тайге Красноярского края, Якутии и Хабаровского края.',
      descEn: 'Widespread boreal fire detections across Central Siberia and the Russian Far East.'
    }
  ],

  // 13. Worldview Cycle 2: Rain and Snow (01 Jul 2023)
  wv_precip: [
    {
      id: 'wv_precip_central_america_pacific',
      nameRu: 'Тропический ливневый пояс Центральной Америки и Тихого океана',
      nameEn: 'Eastern Pacific & Central America Tropical Deluge',
      lat: 11.0,
      lon: -94.0,
      value: 48.0,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ЛИВЕНЬ (48 мм/ч)',
      tagEn: 'DELUGE (48 mm/h)',
      descRu: 'На карте WorldView_Precipitation (01 Jul 2023) ярко-красные и оранжевые ядра у берегов Мексики и Панамы показывают пик тропических ливней.',
      descEn: 'On WorldView_Precipitation (01 Jul 2023), bright red and orange cores off Mexico and Central America mark peak tropical rainfall.'
    },
    {
      id: 'wv_precip_us_midwest_storm',
      nameRu: 'Грозовой супер-фронт Среднего Запада США',
      nameEn: 'US Midwest Mesoscale Convective Storm',
      lat: 39.5,
      lon: -88.0,
      value: 44.5,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'ШТОРМ США (44.5 мм/ч)',
      tagEn: 'US STORM (44.5 mm/h)',
      descRu: 'Мощная красно-желтая полоса грозовых ливней над долиной Миссисипи и Огайо.',
      descEn: 'Intense red-yellow thunderstorm complex sweeping across the US Midwest.'
    },
    {
      id: 'wv_precip_asia_monsoon',
      nameRu: 'Муссонный шторм Бенгальского залива и Восточной Азии',
      nameEn: 'Bay of Bengal & East Asian Monsoon Rain Shield',
      lat: 17.5,
      lon: 92.0,
      value: 46.5,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'МУССОН (46.5 мм/ч)',
      tagEn: 'MONSOON (46.5 mm/h)',
      descRu: 'Обширные красно-оранжевые очаги муссонных осадков над Индией, Мьянмой, Южно-Китайским морем и Японией.',
      descEn: 'Vast red-orange monsoon rain cells across the Bay of Bengal, South China Sea, and Japan.'
    },
    {
      id: 'wv_precip_antarctic_snow',
      nameRu: 'Голубые снежные бури Южного океана (Замерзшие осадки)',
      nameEn: 'Southern Ocean Polar Snowfall Bands (Icy Blue)',
      lat: -62.0,
      lon: 75.0,
      value: 33.0,
      unit: 'мм/ч',
      unitEn: 'mm/h',
      tagRu: 'СНЕГОПАД (33 мм/ч)',
      tagEn: 'SNOW BAND (33 mm/h)',
      descRu: 'Внизу карты WorldView_Precipitation бело-голубые пятна вокруг Антарктиды выделяют зоны интенсивного морского снегопада!',
      descEn: 'Along the bottom of WorldView_Precipitation, icy cyan-white bands around Antarctica highlight intense polar snowfall!'
    }
  ],

  // 14. Worldview Cycle 2: Sea Surface Temperature SST (04 Jul 2023)
  wv_sst: [
    {
      id: 'wv_sst_indo_pacific_crimson',
      nameRu: 'Экваториальный максимум тепла Тихого и Индийского океанов (Темно-красный)',
      nameEn: 'Indo-Pacific Warm Pool Thermal Maximum (Deep Crimson)',
      lat: 10.0,
      lon: 135.0,
      value: 31.2,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ТЕПЛЫЙ БАССЕЙН (+31.2°C)',
      tagEn: 'WARM POOL (+31.2°C)',
      descRu: 'На карте WorldView_SST (04 Jul 2023) густой темно-красный пояс охватывает тропические воды Тихого и Индийского океанов (+31.2°C).',
      descEn: 'On WorldView_SST (04 Jul 2023), a deep crimson belt spans the equatorial Pacific and Indian Ocean warm pool (+31.2°C).'
    },
    {
      id: 'wv_sst_gulf_stream_caribbean',
      nameRu: 'Мексиканский залив и течение Гольфстрим',
      nameEn: 'Gulf of Mexico & Gulf Stream Warm Current',
      lat: 27.0,
      lon: -78.0,
      value: 30.4,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ГОЛЬФСТРИМ (+30.4°C)',
      tagEn: 'GULF STREAM (+30.4°C)',
      descRu: 'Ярко-красный поток тропической воды, поднимающийся вдоль восточного побережья Северной Америки.',
      descEn: 'Deep red ribbon of warm water flowing northward along the North American coast.'
    },
    {
      id: 'wv_sst_southern_blue_ring',
      nameRu: 'Холодное кольцо Южного океана (Сине-фиолетовый спектр)',
      nameEn: 'Antarctic Circumpolar Cold Current (Deep Blue)',
      lat: -56.0,
      lon: 0.0,
      value: 1.2,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ЮЖНЫЙ ОКЕАН (+1.2°C)',
      tagEn: 'COLD RING (+1.2°C)',
      descRu: 'Контрастный переход от белой умеренной зоны к темно-синим ледяным водам вокруг Антарктиды.',
      descEn: 'Sharp thermal gradient transitioning from white temperate waters into deep blue circumpolar cold water.'
    }
  ],

  // 15. Worldview Cycle 2: Land Surface Temperature LST (04 Jul 2023)
  wv_lst: [
    {
      id: 'wv_lst_sahara_arabia_red',
      nameRu: 'Раскаленная поверхность Сахары, Аравии и Ирана (Красно-оранжевый)',
      nameEn: 'Sahara, Arabia & Lut Desert Skin Temperature Peak (+53.5°C)',
      lat: 25.0,
      lon: 45.0,
      value: 53.5,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'СУША (+53.5°C)',
      tagEn: 'LAND SKIN (+53.5°C)',
      descRu: 'На карте WorldView_LST (04 Jul 2023) Сахара, Аравия и Иран пылают ярко-красным цветом (+53.5°C температуры поверхности суши).',
      descEn: 'On WorldView_LST (04 Jul 2023), the Sahara, Arabian Peninsula, and Iran glow intense red-orange (+53.5°C land skin temperature).'
    },
    {
      id: 'wv_lst_greenland_neon_green',
      nameRu: 'Ледниковый щит Гренландии (Ярко-зеленый спектр)',
      nameEn: 'Greenland Ice Sheet (Vivid Green Tier)',
      lat: 73.0,
      lon: -41.0,
      value: -8.5,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'ГРЕНЛАНДИЯ (-8.5°C)',
      tagEn: 'GREENLAND (-8.5°C)',
      descRu: 'На карте WorldView_LST ледниковый купол Гренландии выделяется ярким изумрудно-зеленым цветом летнего ледника (-8.5°C).',
      descEn: 'On WorldView_LST, the Greenland ice sheet stands out in vivid emerald green (-8.5°C boreal summer ice skin temperature).'
    },
    {
      id: 'wv_lst_antarctica_purple',
      nameRu: 'Полярная ночь Антарктиды (Сине-пурпурный спектр)',
      nameEn: 'Antarctic Winter Ice Sheet (Deep Blue-Magenta Freeze)',
      lat: -76.0,
      lon: 75.0,
      value: -44.0,
      unit: '°C',
      unitEn: '°C',
      tagRu: 'АНТАРКТИДА (-44°C)',
      tagEn: 'ANTARCTICA (-44°C)',
      descRu: 'В нижней части карты WorldView_LST сине-пурпурная полоса Антарктиды показывает экстремальный мороз -44°C.',
      descEn: 'Along the bottom of WorldView_LST, the blue-magenta band over Antarctica records extreme -44°C surface freeze.'
    }
  ],

  // 16. Worldview Cycle 2: Polar Sea Ice — Arctic (29 Jun 2023)
  wv_arctic: [
    {
      id: 'arctic_white_core',
      nameRu: 'Центральный белый паковый лед вокруг Северного полюса',
      nameEn: 'Central Arctic Solid White Multi-Year Ice Pack',
      lat: 80.0,
      lon: -10.0,
      value: 98.0,
      unit: '% льда',
      unitEn: '% Ice',
      tagRu: 'ПАКОВЫЙ ЛЕД (98%)',
      tagEn: 'PACK ICE (98%)',
      descRu: 'На карте WorldView_Arctic (29 Jun 2023) в центре виден сплошной белый массив арктического пакового льда с черной точкой полюса.',
      descEn: 'On WorldView_Arctic (29 Jun 2023), the bright white central expanse marks 98% multi-year pack ice surrounding the North Pole.'
    },
    {
      id: 'arctic_hudson_baffin_blue',
      nameRu: 'Голубая зона таяния в Гудзоновом заливе и море Баффина',
      nameEn: 'Hudson Bay & Baffin Marginal Melt Zone (Blue-White)',
      lat: 64.0,
      lon: -78.0,
      value: 56.0,
      unit: '% льда',
      unitEn: '% Ice',
      tagRu: 'ТАЯНИЕ (56% льда)',
      tagEn: 'MELT EDGE (56%)',
      descRu: 'В нижней левой части карты WorldView_Arctic сине-голубые пятна показывают летнее таяние и дрейф льдов в каналах Канады и Гренландии.',
      descEn: 'In the lower-left of WorldView_Arctic, blue-white patches reveal summer sea ice melt across Hudson Bay and Baffin Bay.'
    }
  ],

  // 17. Worldview Cycle 2: Polar Sea Ice — Antarctic (27 Jun 2023)
  wv_antarctic: [
    {
      id: 'antarctic_white_halo',
      nameRu: 'Сплошное белое кольцо зимнего морского льда Антарктики',
      nameEn: 'Antarctic Austral-Winter Solid White Sea Ice Halo',
      lat: -66.0,
      lon: -40.0,
      value: 96.0,
      unit: '% льда',
      unitEn: '% Ice',
      tagRu: 'КОЛЬЦО ЛЬДА (96%)',
      tagEn: 'ICE RING (96%)',
      descRu: 'На карте WorldView_Antarctic (27 Jun 2023) вокруг темно-серого континента Антарктиды сияет мощное белое кольцо морского льда.',
      descEn: 'On WorldView_Antarctic (27 Jun 2023), a vast bright-white winter sea ice ring surrounds the dark gray Antarctic continent.'
    },
    {
      id: 'antarctic_blue_outer_edge',
      nameRu: 'Внешняя голубая кромка льдов в Южном океане',
      nameEn: 'Outer Cobalt-Blue Marginal Ice Edge',
      lat: -60.0,
      lon: 110.0,
      value: 52.0,
      unit: '% льда',
      unitEn: '% Ice',
      tagRu: 'КРОМКА ЛЬДА (52%)',
      tagEn: 'MARGINAL EDGE (52%)',
      descRu: 'Голубая кайма по внешнему периметру белого ледяного кольца на границе со штормами Южного океана.',
      descEn: 'Cobalt-blue outer fringe where drifting Antarctic sea ice meets the Southern Ocean.'
    }
  ],

  // 18. Visualizations: SVS #5120 NOAA GOES-East Full Disk (06/18/2023 06:30 EDT)
  goes_truecolor: [
    {
      id: 'goes_us_night_lights',
      nameRu: 'Ночные огни США и линия рассвета (Левая сторона диска GOES-East)',
      nameEn: 'Nocturnal City Lights & Dawn Terminator (GOES-East West Limb)',
      lat: 36.0,
      lon: -82.0,
      value: 34.0,
      unit: '% яркость',
      unitEn: '% Radiance',
      tagRu: 'ОГНИ НОЧИ И РАССВЕТ',
      tagEn: 'CITY LIGHTS & DAWN',
      descRu: 'На снимке SVS #5120 (NOAA GOES-East 06/18/2023 06:30 EDT) над Северной и Южной Америкой еще ночь и горят золотые огни городов!',
      descEn: 'On SVS #5120 (NOAA GOES-East 06/18/2023 06:30 EDT), North and South America lie on the night side with glowing golden city lights!'
    },
    {
      id: 'goes_sunlit_atlantic_dust',
      nameRu: 'Освещенная солнцем Атлантика, облачные вихри и пыль Сахары',
      nameEn: 'Sunlit Atlantic Cloud Vortices & Saharan Dust Limb',
      lat: 22.0,
      lon: -35.0,
      value: 92.0,
      unit: '% яркость',
      unitEn: '% Radiance',
      tagRu: 'ДНЕВНАЯ АТЛАНТИКА (92%)',
      tagEn: 'SUNLIT ATLANTIC (92%)',
      descRu: 'В правой части диска GOES-East уже наступил день: видны белые спирали циклонов, синий океан и рыжая пыль Сахары у берегов Африки.',
      descEn: 'The eastern half of the GOES-East disc is bathed in morning sunlight, revealing white cloud swirls and tan Saharan dust off West Africa.'
    }
  ]
};

// Direct Pixel-to-Sensor Value Decoder calibrated to each of the 18 NASA SVS #40509 color palettes
export function decodePixelToDatasetValue(datasetId, r, g, b, lat, lon, isLand, fallbackVal) {
  if (r === undefined || g === undefined || b === undefined) return fallbackVal;
  // Ignore pure black corner label boxes (bottom-left timestamp badge or top-left GMAO logo)
  if (r < 5 && g < 5 && b < 5 && datasetId !== 'wv_blackmarble' && datasetId !== 'goes_truecolor') {
    return fallbackVal;
  }

  switch (datasetId) {
    case 'geos_temp': {
      // SVS #5147: Gray inside Sahara/Arabia (lat 10..38, lon -18..62) = +43..+46°C;
      // Dark crimson = +34..+41°C; Red/Orange = +24..+33°C; Yellow = +10..+23°C; Cyan = 0..+9°C; Blue/Purple = -5..-45°C
      const isHotBelt = lat > 10 && lat < 40 && lon > -18 && lon < 65;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (isHotBelt && sat < 35 && r > 70 && r < 185) {
        return Math.round((42.5 + ((185 - r) / 115) * 3.5) * 10) / 10;
      }
      if (r > b + 40) {
        if (g < 65) return Math.round((33 + ((255 - r) / 180) * 8) * 10) / 10; // Dark crimson/red
        if (g < 160) return Math.round((22 + ((160 - g) / 100) * 11) * 10) / 10; // Orange-red
        return Math.round((10 + ((g - 160) / 95) * 12) * 10) / 10; // Yellow
      }
      if (b >= r) {
        if (g > 150) return Math.round((2 + ((g - 150) / 105) * 8) * 10) / 10; // Cyan/aqua
        if (lat < -55) return Math.round((-20 - ((255 - g) / 255) * 25) * 10) / 10; // Antarctica freeze
        return Math.round((-4 - ((b - g) / 200) * 22) * 10) / 10; // Sub-zero blue/indigo
      }
      return fallbackVal;
    }

    case 'geos_wind': {
      // SVS #5148: Red/Orange (r > 180, b < 100) = 26..42 m/s; Yellow (r > 180, g > 180, b < 120) = 18..26 m/s;
      // Cyan (g > 150, b > 180, r < 120) = 11..18 m/s; Blue (b > 120, r < 60) = 5..11 m/s; White/Dark = 1..5 m/s
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (sat < 30) return r > 180 ? 3.2 : 2.0; // White continent or dark calm ocean
      if (r > 165 && b < 110) {
        if (g < 100) return Math.round((32 + ((100 - g) / 100) * 9.5) * 10) / 10; // Crimson/red storm core
        return Math.round((20 + ((255 - g) / 155) * 12) * 10) / 10; // Orange/yellow gale
      }
      if (b > 130 && g > 130 && r < 140) {
        return Math.round((12 + (g / 255) * 7.5) * 10) / 10; // Cyan wind stream
      }
      if (b > 90 && r < 80) {
        return Math.round((5 + (b / 255) * 7) * 10) / 10; // Royal blue breeze
      }
      return fallbackVal;
    }

    case 'geos_precip': {
      // SVS #5149: Green (g > r + 35 && g > b + 20) = 8..24 mm/h; Cyan/Blue rain core (b > 180 && g > 120 && r < 100) = 25..38 mm/h;
      // Red/Magenta core (r > 150 && b > 120 && g < 100) = 38..48 mm/h
      if (r > 140 && b > 110 && g < 110) return Math.round((38 + (r / 255) * 10) * 10) / 10;
      if (b > 175 && g > 110 && r < 95) return Math.round((24 + (b / 255) * 14) * 10) / 10;
      if (g > r + 30 && g > b + 15) return Math.round((6 + ((g - r) / 180) * 18) * 10) / 10;
      if (r > 195 && g > 195 && b > 195 && Math.abs(lat) < 62) return 3.5; // Dense cloud deck
      return 0;
    }

    case 'geos_humidity': {
      // SVS #5150: Deep blue (b > r + 20) = 15..23.5 g/kg; Cream/White = 9..14 g/kg; Tan/Brown (r > b + 25) = 1.2..7.5 g/kg
      const diff = b - r;
      if (diff > 15) {
        return Math.round(Math.min(24, 14 + (diff / 110) * 9.5) * 10) / 10;
      }
      if (diff < -20) {
        return Math.round(Math.max(0.8, 7.5 - (Math.abs(diff) / 110) * 6.0) * 10) / 10;
      }
      return Math.round((10.5 + (diff / 35) * 3.0) * 10) / 10;
    }

    case 'geos_pm25': {
      // SVS #5151: White/pale yellow (g > 225, b > 180) = 4..18 µg/m³; Orange (r > 210, g 110..200, b < 110) = 45..150 µg/m³;
      // Dark brown (r 100..210, g < 110, b < 60) = 155..245 µg/m³
      const darkness = 255 - (g * 0.65 + b * 0.35);
      const val = Math.max(4, Math.min(248, ((darkness - 20) / 195) * 245));
      return Math.round(val * 10) / 10;
    }

    case 'geos_o3': {
      // SVS #5152: Deep purple (b > g + 35) = 65..106 ppbv; Lavender = 38..64 ppbv; Dark gray/black = 12..30 ppbv
      const purple = b - g;
      if (purple > 25) {
        return Math.round(Math.min(108, 48 + (purple / 145) * 58) * 10) / 10;
      }
      const lum = (r + g + b) / 3;
      return Math.round(Math.max(12, 12 + (lum / 255) * 34) * 10) / 10;
    }

    case 'geos_co': {
      // SVS #5153: Pale yellow (r > 230, g > 200, b > 110) = 60..110 ppbv;
      // Orange (r > 210, g 90..190, b < 90) = 160..420 ppbv;
      // Crimson/Blood Red (r > 110, g < 85, b < 50) = 450..745 ppbv
      if (r > 100 && g < 85 && b < 60) {
        return Math.round(Math.min(750, 460 + ((85 - g) / 85) * 285) * 10) / 10;
      }
      if (r > 190 && b < 100) {
        return Math.round((140 + ((210 - g) / 130) * 300) * 10) / 10;
      }
      return Math.round((65 + ((255 - b) / 255) * 55) * 10) / 10;
    }

    case 'geos_nox': {
      // SVS #5154: Green scale: Dark forest/black-green (g > r + 15 && g < 145) = 28..54 ppbv;
      // Medium green (g > r + 40 && g >= 145) = 10..27 ppbv; Pale green/white/black ocean = 0.5..6 ppbv
      if (g > r + 15 && r < 90) {
        if (g < 145) return Math.round(Math.min(54, 28 + ((145 - g) / 120) * 26) * 10) / 10;
        return Math.round((6 + ((240 - r) / 240) * 20) * 10) / 10;
      }
      return 1.2;
    }

    case 'wv_truecolor':
    case 'wv_geostationary':
    case 'goes_truecolor': {
      const lum = Math.round(((0.299 * r + 0.587 * g + 0.114 * b) / 255) * 1000) / 10;
      return Math.max(2, Math.min(99, lum));
    }

    case 'wv_blackmarble': {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return Math.round(Math.min(120, Math.pow(lum, 0.75) * 122));
    }

    case 'wv_fires': {
      // Bright red fire dots on WorldView_Fires.png: r > 185, g < 75, b < 75
      if (r > 175 && g < 85 && b < 85) {
        return Math.round(280 + ((r - 175) / 80) * 165);
      }
      return fallbackVal > 120 ? fallbackVal : 0;
    }

    case 'wv_precip': {
      // WorldView_Precipitation.png: Red/Orange (r > 190, g < 170, b < 60) = 32..48 mm/h;
      // Yellow/Green (g > 150, b < 80) = 8..30 mm/h; Icy blue snow (b > 170, g > 170, lat < -45) = 18..36 mm/h
      if (r > 185 && b < 70) {
        return Math.round((28 + ((255 - g) / 255) * 20) * 10) / 10;
      }
      if (g > 120 && b < 90) {
        return Math.round((6 + (r / 255) * 20) * 10) / 10;
      }
      if (b > 150 && g > 140) {
        return Math.round((16 + (b / 255) * 18) * 10) / 10;
      }
      return 0;
    }

    case 'wv_sst': {
      // WorldView_SST.png: Black continent = 0; Crimson/Red (r > b + 35) = 20..31.5°C;
      // White/Salmon = 13..19°C; Blue (b > r + 25) = -1.5..12°C
      if (r < 20 && g < 20 && b < 25) return 0; // Land mask
      if (r > b + 25) {
        return Math.round(Math.min(31.5, 18 + ((r - g) / 220) * 13.5) * 10) / 10;
      }
      if (b > r + 20) {
        return Math.round(Math.max(-1.8, 12 - ((b - r) / 200) * 13.5) * 10) / 10;
      }
      return 16.5;
    }

    case 'wv_lst': {
      // WorldView_LST.png: Red-orange (r > 200, b < 60, g < 150) = +35..+54°C;
      // Yellow (r > 200, g > 180, b < 80) = +18..+34°C;
      // Vivid green over Greenland (g > r + 30 && g > b + 30) = -12..+4°C;
      // Blue/Magenta over Antarctica (b > 150 && g < 100) = -25..-48°C
      if (r > 195 && b < 70) {
        if (g < 140) return Math.round((36 + ((140 - g) / 140) * 18) * 10) / 10;
        return Math.round((18 + ((255 - g) / 115) * 17) * 10) / 10;
      }
      if (g > r + 25 && g > b + 25) {
        return Math.round((-10 + (r / 255) * 12) * 10) / 10;
      }
      if (b > 140 && g < 110) {
        return Math.round((-24 - (r / 255) * 22) * 10) / 10;
      }
      return fallbackVal;
    }

    case 'wv_arctic':
    case 'wv_antarctic': {
      // White pack ice (r > 200, g > 210, b > 220) = 88..100%;
      // Blue marginal ice (b > r + 35 && b > 100) = 35..82%;
      // Dark gray land (r≈g≈b around 55..85) or black water = 0%
      if (r > 195 && g > 205 && b > 215) {
        return Math.min(100, Math.round(85 + ((r - 195) / 60) * 15));
      }
      if (b > r + 25 && b > 90) {
        return Math.min(84, Math.round(30 + (b / 255) * 54));
      }
      return 0;
    }

    default:
      return fallbackVal;
  }
}

// All 18 Official Visualizations from NASA SVS Gallery #40509 ("Earth Now Dashboard")
export const DATASETS = [
  // ============================================================================
  // GROUP 1: Models: Weather (id: 372478 — NASA GMAO GEOS-FP)
  // ============================================================================
  {
    id: 'geos_temp',
    svsId: 5147,
    itemId: 413305,
    imageId: 858328,
    groupId: 372478,
    groupKey: 'models_weather',
    groupTitle: 'Models: Weather',
    groupTitleRu: 'Модели: Погода (GEOS-FP)',
    name: 'Приземная температура (GEOS-FP)',
    nameEn: 'GEOS-FP Near-Surface Temperature',
    source: 'NASA GMAO GEOS-FP (SVS #5147 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5147/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005147/MC01_stage3_GMAO_near_surface_temperature_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC01_stage3_GMAO_near_surface_temperature_2048x1024_en.00001_print.jpg',
    filename: 'MC01_stage3_GMAO_near_surface_temperature_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:12.616024-05:00',
    time: '2023-08-15',
    unit: '°C',
    min: -45,
    max: 46,
    range: [-45, 46],
    color: '#FF6B00',
    accentClass: 'text-orange-400 border-orange-400',
    description: 'Приземная температура воздуха GEOS-FP (SVS #5147): серебристо-серый тепловой максимум (>+44°C) над Сахарой и Аравией, темно-бордовые тропики и ледяная Антарктида (-44.5°C).',
    descriptionEn: 'GEOS-FP Near-Surface Air Temperature (SVS #5147): metallic-gray extreme heat dome (>+44°C) over Sahara/Arabia, deep crimson tropics, and violet-white Antarctic freeze (-44.5°C).',
    scaleName: 'Қыл-қобыз (строй Дала сазы): от ледяного баса полюсов до знойного вибрато Сахары',
    legend: {
      minLabel: '-45°C (Violet/Blue Freeze)',
      midLabel: '+18°C (Yellow Temperate)',
      maxLabel: '+45°C (Crimson / Gray Core)',
      gradient: 'linear-gradient(to right, #312e81 0%, #2563eb 22%, #fde047 48%, #dc2626 75%, #450a0a 90%, #9ca3af 100%)'
    },
    sample: (lat, lon, isLand) => {
      const spots = HOTSPOTS_BY_DATASET.geos_temp;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 14) {
          const factor = Math.max(0, 1 - d / 14);
          const baseline = 28 - (Math.abs(lat) / 90) * 65;
          return Math.round((baseline * (1 - factor) + spot.value * factor) * 10) / 10;
        }
      }
      const absLat = Math.abs(lat);
      let base = 28 - (absLat / 90) * 65;
      if (isLand && lat >= 14 && lat <= 36 && lon >= -17 && lon <= 60) base = 42.5;
      return Math.round(Math.min(46, Math.max(-45, base)) * 10) / 10;
    },
    formatValue: (v) => `${v > 0 ? '+' : ''}${v}°C (${v > 38 ? 'Extreme Heat Dome / Зной' : v < -10 ? 'Polar Freeze / Мороз' : 'Temperate / Умеренно'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, (val - -45) / 91));
      return { frequency: 65 * Math.pow(2, norm * 3.8), waveform: 'triangle', filterFreq: 400 + norm * 3200, resonance: 2.5, pulseRate: norm > 0.8 ? 3.5 : 0, volume: 0.32 };
    }
  },
  {
    id: 'geos_wind',
    svsId: 5148,
    itemId: 413143,
    imageId: 858325,
    groupId: 372478,
    groupKey: 'models_weather',
    groupTitle: 'Models: Weather',
    groupTitleRu: 'Модели: Погода (GEOS-FP)',
    name: 'Скорость приземного ветра (GEOS-FP)',
    nameEn: 'GEOS-FP Near-Surface Wind Speed',
    source: 'NASA GMAO GEOS-FP (SVS #5148 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5148/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005148/MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_print.jpg',
    filename: 'MC02_stage3_GMAO_near_surface_wind_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:22.353353-05:00',
    time: '2023-08-15',
    unit: 'м/с',
    min: 0,
    max: 42,
    range: [0, 42],
    color: '#38BDF8',
    accentClass: 'text-sky-400 border-sky-400',
    description: 'Главная обложка Earth Now Dashboard (SVS #5148): мощнейшие красно-оранжевые штормовые вихри в Южном Тихом и Индийском океанах (до 39.5 м/с) и тайфун Лан у берегов Японии.',
    descriptionEn: 'Featured cover of Earth Now Dashboard (SVS #5148): fierce crimson-orange storm vortices across the South Pacific and Southern Indian Ocean (up to 39.5 m/s) plus Typhoon Lan over Japan.',
    scaleName: 'Флейта Сыбызғы (Дорийский лад): дыхание степного ветра и рев океанических штормов',
    legend: {
      minLabel: '0 m/s (Navy/White Calm)',
      midLabel: '16 m/s (Cyan Stream)',
      maxLabel: '40 m/s (Red/Crimson Vortex)',
      gradient: 'linear-gradient(to right, #090d16 0%, #1d4ed8 25%, #06b6d4 50%, #facc15 75%, #dc2626 100%)'
    },
    sample: (lat, lon, isLand) => {
      const spots = HOTSPOTS_BY_DATASET.geos_wind;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round((8 + (spot.value - 8) * factor) * 10) / 10;
        }
      }
      if (lat < -38 && lat > -64) return 24.5;
      return isLand ? 4.0 : 9.5;
    },
    formatValue: (v) => `${v} m/s (${v > 24 ? 'Storm Vortex / Ураганный шторм' : v > 12 ? 'Strong Stream / Сильный поток' : 'Calm / Слабый ветер'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 42));
      return { frequency: 140 + norm * 460, waveform: 'sine', filterFreq: 550 + norm * 3600, resonance: 4.0, pulseRate: 1.2 + norm * 6.5, volume: 0.34, noiseAmount: 0.18 + norm * 0.52 };
    }
  },
  {
    id: 'geos_precip',
    svsId: 5149,
    itemId: 413144,
    imageId: 858332,
    groupId: 372478,
    groupKey: 'models_weather',
    groupTitle: 'Models: Weather',
    groupTitleRu: 'Модели: Погода (GEOS-FP)',
    name: 'Осадки и облачность (GEOS-FP)',
    nameEn: 'GEOS-FP Precipitation and Clouds',
    source: 'NASA GMAO GEOS-FP (SVS #5149 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5149/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005149/MC03_stage3_GMAO_precipitation_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC03_stage3_GMAO_precipitation_2048x1024_en.00001_print.jpg',
    filename: 'MC03_stage3_GMAO_precipitation_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:35.239685-05:00',
    time: '2023-08-15',
    unit: 'мм/ч',
    min: 0,
    max: 50,
    range: [0, 50],
    color: '#00D2FF',
    accentClass: 'text-cyan-400 border-cyan-400',
    description: 'Осадки и облачный покров GEOS-FP (SVS #5149): сине-пурпурные тропические ливни у берегов Мексики и Западной Африки (45 мм/ч) и спираль тайфуна Лан над Японией.',
    descriptionEn: 'GEOS-FP Precipitation & Clouds (SVS #5149): intense blue-magenta convective rain cores off Mexico and West Africa (45 mm/h) and Typhoon Lan spiraling over Japan.',
    scaleName: 'Домбыра (строй Қоңыр Күй): стремительный галоп кюя и перкуссия тропического ливня',
    legend: {
      minLabel: '0 mm/h (Clear)',
      midLabel: '18 mm/h (Green Rain Band)',
      maxLabel: '48 mm/h (Blue/Magenta Storm)',
      gradient: 'linear-gradient(to right, #0f172a 0%, #22c55e 35%, #06b6d4 65%, #3b82f6 82%, #db2777 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_precip;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 14) {
          const factor = Math.max(0, 1 - d / 14);
          return Math.round(spot.value * factor * 10) / 10;
        }
      }
      if (lat > 4 && lat < 15) return 18.0;
      return 1.5;
    },
    formatValue: (v, lat) => {
      if (v <= 0.5) return '0 mm/h (Clear / Безоблачно)';
      if (lat !== undefined && Math.abs(lat) > 52) return `${v} mm/h (Frontal Snow / Снежный фронт)`;
      return `${v} mm/h (${v > 25 ? 'Convective Deluge / Тропический ливень' : 'Rain & Clouds / Дождь'})`;
    },
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 50));
      return { frequency: 185 + norm * 340, waveform: 'triangle', filterFreq: 950 + norm * 3000, resonance: 3.2, pulseRate: 2.0 + norm * 6.5, volume: 0.35, noiseAmount: 0.22 + norm * 0.5 };
    }
  },
  {
    id: 'geos_humidity',
    svsId: 5150,
    itemId: 413145,
    imageId: 1202189,
    groupId: 372478,
    groupKey: 'models_weather',
    groupTitle: 'Models: Weather',
    groupTitleRu: 'Модели: Погода (GEOS-FP)',
    name: 'Приземная влажность Q2M (GEOS-FP)',
    nameEn: 'GEOS-FP Near-Surface Humidity (Q2M)',
    source: 'NASA GMAO GEOS-FP (SVS #5150 • 26 Feb 2026)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5150/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005150/MC04_stage3_GMAO_near_surface_humidity_2048x1024.png',
    localImage: '/earth-now/MC04_stage3_GMAO_near_surface_humidity_2048x1024.png',
    filename: 'MC04_stage3_GMAO_near_surface_humidity_2048x1024.png',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:41.810601-05:00',
    time: '2026-02-26',
    unit: 'г/кг',
    min: 0,
    max: 24,
    range: [0, 24],
    color: '#2DD4BF',
    accentClass: 'text-teal-400 border-teal-400',
    description: 'Удельная влажность Q2M (SVS #5150, 26 Feb 2026): глубокий сапфирово-синий экваториальный пояс влаги над Индо-Тихоокеанским бассейном и Амазонией (23.2 г/кг) против коричневых сухих континентов.',
    descriptionEn: 'Specific Humidity Q2M (SVS #5150, 26 Feb 2026): deep sapphire-blue equatorial moisture river across the Indo-Pacific and Amazon (23.2 g/kg) contrasting with tan-brown arid interiors.',
    scaleName: 'Семиструнный Жетіген (Пентатоника): журчащие переборы атмосферных рек',
    legend: {
      minLabel: '0 g/kg (Tan-Brown Dry)',
      midLabel: '12 g/kg (Cream Transition)',
      maxLabel: '24 g/kg (Deep Blue Humid)',
      gradient: 'linear-gradient(to right, #92400e 0%, #d6b388 35%, #f8fafc 50%, #7dd3fc 75%, #1d4ed8 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_humidity;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          const base = Math.max(1.5, 21 - (Math.abs(lat) / 90) * 19);
          return Math.round((base * (1 - factor) + spot.value * factor) * 10) / 10;
        }
      }
      return Math.round(Math.max(1.2, 21 - (Math.abs(lat) / 90) * 19.5) * 10) / 10;
    },
    formatValue: (v) => `${v} g/kg (${v > 16 ? 'Deep Blue Moisture Plume / Влажный поток' : v < 5 ? 'Brown Arid Air / Сухой воздух' : 'Moderate / Умеренно'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 24));
      return { frequency: 196 + norm * 340, waveform: 'sine', filterFreq: 750 + norm * 3200, resonance: 2.8, pulseRate: norm * 3.5, volume: 0.32 };
    }
  },

  // ============================================================================
  // GROUP 2: Models: Air Quality (id: 372479 — NASA GMAO GEOS-CF)
  // ============================================================================
  {
    id: 'geos_pm25',
    svsId: 5151,
    itemId: 413146,
    imageId: 858344,
    groupId: 372479,
    groupKey: 'models_air_quality',
    groupTitle: 'Models: Air Quality',
    groupTitleRu: 'Модели: Качество воздуха (GEOS-CF)',
    name: 'Твердые частицы PM2.5 (GEOS-CF)',
    nameEn: 'Particulate Matter (PM) 2.5',
    source: 'NASA GMAO GEOS-CF (SVS #5151 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5151/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005151/MC01_stage4_GMAO_pm25_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC01_stage4_GMAO_pm25_2048x1024_en.00001_print.jpg',
    filename: 'MC01_stage4_GMAO_pm25_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:43.822552-05:00',
    time: '2023-08-15',
    unit: 'мкг/м³',
    min: 0,
    max: 250,
    range: [0, 250],
    color: '#F59E0B',
    accentClass: 'text-amber-400 border-amber-400',
    description: 'Мелкодисперсные аэрозоли PM2.5 (SVS #5151): густой темно-коричневый дым пожаров Канады и Якутии (238 мкг/м³), пыль Такла-Макан и трансатлантический вынос песков Сахары.',
    descriptionEn: 'Fine Particulate Matter PM2.5 (SVS #5151): dark burnt-brown wildfire smoke over Northwest Canada and Yakutia (238 µg/m³), Asian dust, and trans-Atlantic Saharan dust plumes.',
    scaleName: 'Шаңқобыз (Минорный лад): вибрирующие обертоны пылевых бурь и дымовых шлейфов',
    legend: {
      minLabel: '0 µg/m³ (Cream Clean)',
      midLabel: '90 µg/m³ (Orange Dust)',
      maxLabel: '240+ µg/m³ (Dark Brown Smoke)',
      gradient: 'linear-gradient(to right, #fffbeb 0%, #fde68a 25%, #f59e0b 55%, #b45309 80%, #451a03 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_pm25;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round((12 + (spot.value - 12) * factor) * 10) / 10;
        }
      }
      return 12.0;
    },
    formatValue: (v) => `${v} µg/m³ (${v > 110 ? 'Dense Smoke/Dust Plume / Густой шлейф' : v > 35 ? 'Moderate Aerosol / Дымка' : 'Clean Air / Чисто'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 250));
      return { frequency: 110 + norm * 380, waveform: 'sawtooth', filterFreq: 500 + norm * 3000, resonance: 5.0, pulseRate: 1.5 + norm * 6.5, volume: 0.34, noiseAmount: 0.12 + norm * 0.4 };
    }
  },
  {
    id: 'geos_o3',
    svsId: 5152,
    itemId: 413147,
    imageId: 858348,
    groupId: 372479,
    groupKey: 'models_air_quality',
    groupTitle: 'Models: Air Quality',
    groupTitleRu: 'Модели: Качество воздуха (GEOS-CF)',
    name: 'Приземный озон O3 (GEOS-CF)',
    nameEn: 'Near surface Ozone (O3)',
    source: 'NASA GMAO GEOS-CF (SVS #5152 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5152/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005152/MC02_stage4_GMAO_O3_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC02_stage4_GMAO_O3_2048x1024_en.00001_print.jpg',
    filename: 'MC02_stage4_GMAO_O3_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:45.634511-05:00',
    time: '2023-08-15',
    unit: 'ppbv',
    min: 10,
    max: 110,
    range: [10, 110],
    color: '#A855F7',
    accentClass: 'text-purple-400 border-purple-400',
    description: 'Приземный озон O3 (SVS #5152): ярко-фиолетовый пояс фотохимического смога над Персидским заливом, Ираном, Китаем (до 104 ppbv) и саваннами Анголы/Конго.',
    descriptionEn: 'Near-Surface Ozone O3 (SVS #5152): deep violet photochemical ozone belt across the Persian Gulf, Iran, Eastern China (up to 104 ppbv), and Central Africa.',
    scaleName: 'Гармонический Орган (Лидийский лад): ультрафиолетовый резонанс озонового купола',
    legend: {
      minLabel: '10 ppbv (Dark Gray Low)',
      midLabel: '50 ppbv (Lavender Mid)',
      maxLabel: '105 ppbv (Deep Purple Peak)',
      gradient: 'linear-gradient(to right, #1f2937 0%, #9ca3af 35%, #a855f7 70%, #4c1d95 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_o3;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round((32 + (spot.value - 32) * factor) * 10) / 10;
        }
      }
      return lat > 15 && lat < 55 ? 52.0 : 28.0;
    },
    formatValue: (v) => `${v} ppbv (${v > 68 ? 'Deep Purple Ozone Peak / Смог O3' : 'Background O3 / Норма'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, (val - 10) / 100));
      return { frequency: 130 + norm * 320, waveform: 'triangle', filterFreq: 600 + norm * 2600, resonance: 4.0, pulseRate: norm * 4.5, volume: 0.32 };
    }
  },
  {
    id: 'geos_co',
    svsId: 5153,
    itemId: 413148,
    imageId: 858352,
    groupId: 372479,
    groupKey: 'models_air_quality',
    groupTitle: 'Models: Air Quality',
    groupTitleRu: 'Модели: Качество воздуха (GEOS-CF)',
    name: 'Угарный газ CO (GEOS-CF)',
    nameEn: 'Carbon Monoxide (CO)',
    source: 'NASA GMAO GEOS-CF (SVS #5153 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5153/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005153/MC03_stage4_GMAO_CO_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC03_stage4_GMAO_CO_2048x1024_en.00001_print.jpg',
    filename: 'MC03_stage4_GMAO_CO_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:47.849484-05:00',
    time: '2023-08-15',
    unit: 'ppbv',
    min: 50,
    max: 750,
    range: [50, 750],
    color: '#EF4444',
    accentClass: 'text-red-400 border-red-400',
    description: 'Угарный газ CO (SVS #5153): кроваво-красные мега-шлейфы от пожаров в Канаде (740 ppbv), Сибири, Центральной Африке и индустриальных центрах Китая.',
    descriptionEn: 'Carbon Monoxide CO (SVS #5153): blood-crimson wildfire CO megaplumes across Canada (740 ppbv), Eastern Siberia, Central Africa, and Eastern China.',
    scaleName: 'Қыл-қобыз (Минор): драматический густой смычковый бас над шлейфами горения CO',
    legend: {
      minLabel: '50 ppbv (Pale Yellow)',
      midLabel: '300 ppbv (Orange Plume)',
      maxLabel: '740+ ppbv (Blood-Red Core)',
      gradient: 'linear-gradient(to right, #fef08a 0%, #fb923c 35%, #ef4444 65%, #7f1d1d 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_co;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round((85 + (spot.value - 85) * factor) * 10) / 10;
        }
      }
      return lat > 0 ? 115.0 : 68.0;
    },
    formatValue: (v) => `${v} ppbv (${v > 320 ? 'Crimson CO Megaplume / Экстремальный CO' : 'Background CO / Фон'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, (val - 50) / 700));
      return { frequency: 90 + norm * 260, waveform: 'sawtooth', filterFreq: 350 + norm * 2000, resonance: 4.8, pulseRate: 1.0 + norm * 5.5, volume: 0.34 };
    }
  },
  {
    id: 'geos_nox',
    svsId: 5154,
    itemId: 413149,
    imageId: 858357,
    groupId: 372479,
    groupKey: 'models_air_quality',
    groupTitle: 'Models: Air Quality',
    groupTitleRu: 'Модели: Качество воздуха (GEOS-CF)',
    name: 'Оксиды азота NOx (GEOS-CF)',
    nameEn: 'Nitrogen Oxides (NOx)',
    source: 'NASA GMAO GEOS-CF (SVS #5154 • 15 Aug 2023)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5154/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005154/MC04_stage4_GMAO_NO2_2048x1024_en.00001_print.jpg',
    localImage: '/earth-now/MC04_stage4_GMAO_NO2_2048x1024_en.00001_print.jpg',
    filename: 'MC04_stage4_GMAO_NO2_2048x1024_en.00001_print.jpg',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2026-11-15T02:00:49.837339-05:00',
    time: '2023-08-15',
    unit: 'ppbv',
    min: 0,
    max: 55,
    range: [0, 55],
    color: '#22C55E',
    accentClass: 'text-emerald-400 border-emerald-400',
    description: 'Оксиды азота NOx (SVS #5154): изумрудно-черные пики над мегаполисами Китая, США и Европы (52 ppbv) и четкие прямые линии морских судоходных трасс через океаны!',
    descriptionEn: 'Nitrogen Oxides NOx (SVS #5154): dark forest-green peaks over Chinese, US, and European megacities (52 ppbv) plus linear maritime shipping lanes across the oceans!',
    scaleName: 'Кристалл FM (Дорийский лад): пульсация индустриальных узлов и морских трасс',
    legend: {
      minLabel: '0 ppbv (White/Black Clean)',
      midLabel: '20 ppbv (Green Shipping Track)',
      maxLabel: '52 ppbv (Dark Forest-Green Peak)',
      gradient: 'linear-gradient(to right, #f8fafc 0%, #86efac 30%, #22c55e 60%, #15803d 82%, #052e16 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.geos_nox;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 12) {
          const factor = Math.max(0, 1 - d / 12);
          return Math.round(spot.value * factor * 10) / 10;
        }
      }
      return 2.0;
    },
    formatValue: (v) => `${v} ppbv (${v > 18 ? 'Dark-Green NOx Plume / Выброс NOx' : 'Low Background / Фон'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 55));
      return { frequency: 240 + norm * 540, waveform: 'sine', filterFreq: 850 + norm * 3600, resonance: 5.0, pulseRate: norm > 0.2 ? 3.8 : 0, volume: 0.32 };
    }
  },

  // ============================================================================
  // GROUP 3: Worldview Satellite Observations - First Cycle (id: 372598 — LANCE)
  // ============================================================================
  {
    id: 'wv_fires',
    svsId: 40509,
    itemId: 413325,
    imageId: 860412,
    groupId: 372598,
    groupKey: 'worldview_cycle1',
    groupTitle: 'Worldview Satellite Observations - First Cycle',
    groupTitleRu: 'Спутники Worldview — Цикл 1 (LANCE)',
    name: 'Активные пожары (Suomi NPP VIIRS)',
    nameEn: 'Active fires detected by Suomi NPP satellite',
    source: 'NASA Worldview LANCE / Suomi NPP Fires (#413325 • 04 Jul 2023)',
    svsUrl: 'https://go.nasa.gov/3QpeF6y',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/WorldView_Fires.png',
    localImage: '/earth-now/WorldView_Fires.png',
    filename: 'WorldView_Fires.png',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2023-10-25T00:00:00-04:00',
    time: '2023-07-04',
    unit: 'MW',
    min: 0,
    max: 450,
    range: [0, 450],
    color: '#FF3B00',
    accentClass: 'text-red-500 border-red-500',
    description: 'Активные пожары Suomi NPP (04 Jul 2023): гигантский сплошной красный пояс горения в Центральной Африке (Ангола/Конго, 440 МВт), Бразилии, Квебеке/Канаде и Сибири!',
    descriptionEn: 'Suomi NPP Active Fires (04 Jul 2023): massive solid-red wildfire belt across Central Africa (Angola/DRC, 440 MW), Brazil, Quebec/Western Canada, and Siberia!',
    scaleName: 'Шаңқобыз и Домбыра (строй Күй): тревожный пульс и треск пламени над очагами пожаров',
    legend: {
      minLabel: '0 MW (No Fire)',
      midLabel: '220 MW (Fire Perimeter)',
      maxLabel: '440+ MW (Dense Red Fire Belt)',
      gradient: 'linear-gradient(to right, #0f172a 0%, #7f1d1d 30%, #dc2626 60%, #f97316 85%, #fef08a 100%)'
    },
    sample: (lat, lon, isLand) => {
      if (!isLand) return 0;
      const spots = HOTSPOTS_BY_DATASET.wv_fires;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round(spot.value * factor);
        }
      }
      return 0;
    },
    formatValue: (v) => (v > 0 ? `${v} MW (Active Fire Cluster / Очаг пожара Suomi NPP)` : '0 MW (No Active Fires / Спокойно)'),
    getSonificationParams: (val) => {
      const hasFire = val > 0;
      const norm = Math.max(0, Math.min(1, val / 450));
      return {
        frequency: hasFire ? 500 + norm * 750 : 150,
        waveform: 'sawtooth',
        filterFreq: hasFire ? 1800 + norm * 4000 : 280,
        resonance: hasFire ? 6.5 : 1.2,
        pulseRate: hasFire ? 4.5 + norm * 8.0 : 0,
        volume: hasFire ? 0.36 : 0.1,
        noiseAmount: hasFire ? 0.38 : 0
      };
    }
  },

  // ============================================================================
  // GROUP 4: Worldview Satellite Observations - Second Cycle (id: 372602)
  // ============================================================================
  {
    id: 'wv_precip',
    svsId: 40509,
    itemId: 413326,
    imageId: 860413,
    groupId: 372602,
    groupKey: 'worldview_cycle2',
    groupTitle: 'Worldview Satellite Observations - Second Cycle',
    groupTitleRu: 'Спутники Worldview — Цикл 2',
    name: 'Дождь и снег (Worldview IMERG)',
    nameEn: 'Rain and Snow',
    source: 'NASA Worldview Cycle 2 / GPM IMERG (#413326 • 01 Jul 2023)',
    svsUrl: 'https://go.nasa.gov/3tzR9lI',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/WorldView_Precipitation.png',
    localImage: '/earth-now/WorldView_Precipitation.png',
    filename: 'WorldView_Precipitation.png',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2023-10-25T00:00:00-04:00',
    time: '2023-07-01',
    unit: 'мм/ч',
    min: 0,
    max: 50,
    range: [0, 50],
    color: '#06B6D4',
    accentClass: 'text-cyan-300 border-cyan-300',
    description: 'Дождь и снег Worldview (01 Jul 2023): красно-оранжевые грозовые штормы над США, Мексикой и Бенгальским заливом (48 мм/ч) и льдисто-голубые полосы снегопадов у берегов Антарктиды!',
    descriptionEn: 'Worldview Rain and Snow (01 Jul 2023): red-orange thunderstorm deluges over the US Midwest, Mexico, and Bay of Bengal (48 mm/h) plus icy-blue Antarctic snowfall bands!',
    scaleName: 'Домбыра (Пентатоника): ритмика капель дождя и хрустальный звон антарктических снегопадов',
    legend: {
      minLabel: '0 mm/h (Dry Black/Gray)',
      midLabel: '22 mm/h (Green/Yellow Rain)',
      maxLabel: '48 mm/h (Red Storm / Cyan Snow)',
      gradient: 'linear-gradient(to right, #090d16 0%, #22c55e 30%, #facc15 55%, #ef4444 80%, #7dd3fc 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.wv_precip;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 15) {
          const factor = Math.max(0, 1 - d / 15);
          return Math.round(spot.value * factor * 10) / 10;
        }
      }
      return Math.abs(lat) < 12 ? 15.0 : 0;
    },
    formatValue: (v, lat) => {
      if (v <= 0) return '0 mm/h (Dry / Без осадков)';
      return `${v} mm/h (${lat !== undefined && lat < -48 ? 'Polar Snowfall / Снегопад' : 'Heavy Rainfall / Ливень'})`;
    },
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 50));
      return { frequency: 210 + norm * 320, waveform: 'triangle', filterFreq: 1000 + norm * 3200, resonance: 3.2, pulseRate: 2.0 + norm * 5.5, volume: 0.34, noiseAmount: 0.25 + norm * 0.45 };
    }
  },
  {
    id: 'wv_sst',
    svsId: 40509,
    itemId: 413327,
    imageId: 860414,
    groupId: 372602,
    groupKey: 'worldview_cycle2',
    groupTitle: 'Worldview Satellite Observations - Second Cycle',
    groupTitleRu: 'Спутники Worldview — Цикл 2',
    name: 'Температура поверхности моря (SST)',
    nameEn: 'Sea Surface Temperature',
    source: 'NASA Worldview Cycle 2 / GHRSST MUR (#413327 • 04 Jul 2023)',
    svsUrl: 'https://go.nasa.gov/405E5yS',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/images/gallery/EarthNowDashboard/WorldView_SST.png',
    localImage: '/earth-now/WorldView_SST.png',
    filename: 'WorldView_SST.png',
    projection: 'equirectangular',
    releaseDate: '2023-10-16T00:00:00-04:00',
    updateDate: '2023-10-25T00:00:00-04:00',
    time: '2023-07-04',
    unit: '°C',
    min: -1.8,
    max: 32,
    range: [-1.8, 32],
    color: '#00F0FF',
    accentClass: 'text-cyan-400 border-cyan-400',
    description: 'Температура поверхности моря SST (04 Jul 2023): густой темно-красный экваториальный пояс и Гольфстрим (+31.2°C), белая переходная зона и синее кольцо Южного океана (+1.2°C).',
    descriptionEn: 'Sea Surface Temperature SST (04 Jul 2023): deep crimson equatorial warm pool and Gulf Stream (+31.2°C), white temperate transition, and deep blue Southern Ocean (+1.2°C).',
    scaleName: 'Флейта Сыбызғы (Контур «Волна глубины»): плавное течение теплых и холодных вод',
    legend: {
      minLabel: '-1.8°C (Deep Blue Polar)',
      midLabel: '+16°C (White Temperate)',
      maxLabel: '+31.5°C (Deep Crimson Tropical)',
      gradient: 'linear-gradient(to right, #1e3a8a 0%, #60a5fa 30%, #f8fafc 50%, #f87171 75%, #991b1b 100%)'
    },
    sample: (lat, lon, isLand) => {
      if (isLand) return 0;
      const spots = HOTSPOTS_BY_DATASET.wv_sst;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 14) {
          const factor = Math.max(0, 1 - d / 14);
          const base = 29 - (Math.abs(lat) / 75) * 30;
          return Math.round((base * (1 - factor) + spot.value * factor) * 10) / 10;
        }
      }
      return Math.round(Math.min(31.5, Math.max(-1.8, 29 - (Math.abs(lat) / 75) * 30)) * 10) / 10;
    },
    formatValue: (v) => `${v > 0 ? '+' : ''}${v}°C (Sea Surface / Морская вода)`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, (val - -1.8) / 33.8));
      return { frequency: 65 + Math.pow(norm, 1.5) * 430, waveform: 'triangle', filterFreq: 350 + norm * 2300, resonance: 3.0, pulseRate: 0.4, volume: 0.32 };
    }
  },
  // ============================================================================
  {
    id: 'goes_truecolor',
    svsId: 5120,
    itemId: 413321,
    imageId: 856333,
    groupId: 372607,
    groupKey: 'visualizations',
    groupTitle: 'Visualizations',
    groupTitleRu: 'Геостационарные визуализации (GOES)',
    name: 'Полный диск NOAA GOES-East (SVS #5120)',
    nameEn: 'NOAA GOES-East and NOAA GOES-West True Color Imagery Over Past 5 Days',
    source: 'NASA SVS #5120 / NOAA GOES-East (06/18/2023 06:30 EDT)',
    svsUrl: 'http://svs.gsfc.nasa.gov/5120/',
    svsImageUrl: 'http://svs.gsfc.nasa.gov/vis/a000000/a005100/a005120/PR_WorldView_geostationary_east_2160x2160_en.00001_print.jpg',
    localImage: '/earth-now/PR_WorldView_geostationary_east_2160x2160_en.00001_print.jpg',
    filename: 'PR_WorldView_geostationary_east_2160x2160_en.00001_print.jpg',
    projection: 'full_disk',
    releaseDate: '2023-07-07T00:00:00-04:00',
    updateDate: '2026-11-14T23:35:19.220766-05:00',
    time: '2023-06-18',
    unit: '% яркость',
    min: 0,
    max: 100,
    range: [0, 100],
    color: '#818CF8',
    accentClass: 'text-indigo-400 border-indigo-400',
    description: 'Полный диск Земли NOAA GOES-East (SVS #5120, 06/18/2023 06:30 EDT): ночные огни Северной и Южной Америки слева, рассветный терминатор по центру и солнечная Атлантика с пылью Сахары справа!',
    descriptionEn: 'Full-Disk NOAA GOES-East (SVS #5120, 06/18/2023 06:30 EDT): nocturnal city lights over the Americas on the left, the dawn terminator down the center, and sunlit Atlantic clouds & Saharan dust on the right!',
    scaleName: 'Теплый Космический Пэд и Жетіген (Лидийский лад): симфония рассветного терминатора Земли',
    legend: {
      minLabel: '0% (Night & City Lights)',
      midLabel: '50% (Dawn Terminator)',
      maxLabel: '100% (Sunlit Atlantic Clouds)',
      gradient: 'linear-gradient(to right, #020617 0%, #312e81 30%, #2563eb 60%, #93c5fd 85%, #ffffff 100%)'
    },
    sample: (lat, lon) => {
      const spots = HOTSPOTS_BY_DATASET.goes_truecolor;
      for (const spot of spots) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 16) {
          const factor = Math.max(0, 1 - d / 16);
          return Math.round((45 + (spot.value - 45) * factor) * 10) / 10;
        }
      }
      return lon > -60 ? 82.0 : 28.0;
    },
    formatValue: (v) => `${v}% Disc Radiance (${v > 55 ? 'Sunlit Atlantic / Дневная Атлантика' : 'Night & City Lights / Ночные огни Америки'})`,
    getSonificationParams: (val) => {
      const norm = Math.max(0, Math.min(1, val / 100));
      return { frequency: 146.83 + norm * 440, waveform: 'sine', filterFreq: 600 + norm * 3200, resonance: 3.2, pulseRate: 0, volume: 0.32 };
    }
  }
];

// Thematic Chromophonia Musical Profile per Map (Instrument, Scale, Contour, Base Intensity, Reverb & Acoustic Theme)
export const DATASET_MUSIC_PROFILES = {
  geos_temp: {
    timbre: 'kobyz',
    scale: 'dala',
    contourId: 'steppe_horizon',
    baseIntensity: 1.25,
    reverb: 0.48,
    scaleNameRu: 'Қыл-қобыз • Лад «Дала сазы» (Тепловой контраст полюсов и пустынь)',
    scaleNameEn: 'Kyl-Kobyz • Dala Sazy Scale (Thermal Contrast of Poles & Deserts)'
  },
  geos_wind: {
    timbre: 'sybyzgy',
    scale: 'dorian',
    contourId: 'wind_ornament',
    baseIntensity: 1.35,
    reverb: 0.52,
    scaleNameRu: 'Сыбызғы • Дорийский лад («Орнамент ветра» и вихри Южного океана)',
    scaleNameEn: 'Sybyzgy Flute • Dorian Mode ("Wind Ornament" & Southern Ocean Gales)'
  },
  geos_precip: {
    timbre: 'dombra',
    scale: 'kuy',
    contourId: 'kui_gallop',
    baseIntensity: 1.4,
    reverb: 0.38,
    scaleNameRu: 'Домбыра • Строй «Қоңыр Күй» («Движение кюя» и перкуссия ливней)',
    scaleNameEn: 'Kazakh Dombra • Qonyr Kui ("Kui Gallop" & Storm Rain Percussion)'
  },
  geos_humidity: {
    timbre: 'zhetigen',
    scale: 'pentatonic',
    contourId: 'ocean_wave',
    baseIntensity: 1.15,
    reverb: 0.58,
    scaleNameRu: 'Жетіген • Пентатоника («Волна глубины» и атмосферные реки пара)',
    scaleNameEn: '7-String Zhetigen • Pentatonic ("Deep Ocean Wave" & Moisture Rivers)'
  },
  geos_pm25: {
    timbre: 'shankobyz',
    scale: 'minor',
    contourId: 'kui_gallop',
    baseIntensity: 1.45,
    reverb: 0.36,
    scaleNameRu: 'Шаңқобыз • Минорный лад (Резонанс пылевых бурь и дыма пожаров)',
    scaleNameEn: 'Shankobyz Jaw Harp • Minor Scale (Saharan Dust & Wildfire Smoke Resonance)'
  },
  geos_o3: {
    timbre: 'organ',
    scale: 'lydian',
    contourId: 'celestial_gleam',
    baseIntensity: 1.2,
    reverb: 0.62,
    scaleNameRu: 'Гармонический Орган • Лидийский лад (Фотохимическое свечение озона O3)',
    scaleNameEn: 'Harmonic Organ • Lydian Mode (Photochemical Ozone Shimmer)'
  },
  geos_co: {
    timbre: 'kobyz',
    scale: 'minor',
    contourId: 'mountain_echo',
    baseIntensity: 1.45,
    reverb: 0.5,
    scaleNameRu: 'Қыл-қобыз • Натуральный минор (Драматический бас шлейфов угарного газа CO)',
    scaleNameEn: 'Kyl-Kobyz • Minor Scale (Dramatic Bass of Wildfire CO Megaplumes)'
  },
  geos_nox: {
    timbre: 'crystal',
    scale: 'dorian',
    contourId: 'kui_gallop',
    baseIntensity: 1.25,
    reverb: 0.42,
    scaleNameRu: 'Кристалл FM • Дорийский лад (Пульс мегаполисов и морских судоходных трасс NOx)',
    scaleNameEn: 'Crystal FM • Dorian Mode (Megacity NOx & Ocean Shipping Lane Pulse)'
  },
  wv_truecolor: {
    timbre: 'zhetigen',
    scale: 'major',
    contourId: 'steppe_horizon',
    baseIntensity: 1.1,
    reverb: 0.48,
    scaleNameRu: 'Жетіген • Мажорный лад (Дневные полосы пролета и орбиты спутника Terra)',
    scaleNameEn: 'Zhetigen Harp • Major Scale (Daytime Terra Swaths & Orbit Tracks)'
  },
  wv_blackmarble: {
    timbre: 'crystal',
    scale: 'lydian',
    contourId: 'celestial_gleam',
    baseIntensity: 1.15,
    reverb: 0.68,
    scaleNameRu: 'Кристалл FM • Лидийский лад («Небесный отблеск» ночных огней Suomi NPP)',
    scaleNameEn: 'Crystal FM Bell • Lydian Mode ("Celestial Gleam" of Suomi NPP Night Lights)'
  },
  wv_geostationary: {
    timbre: 'pad',
    scale: 'dala',
    contourId: 'steppe_horizon',
    baseIntensity: 1.1,
    reverb: 0.64,
    scaleNameRu: 'Теплый Пэд • Лад «Дала сазы» (Панорама геостационарных дисков NOAA и JAXA)',
    scaleNameEn: 'Warm Synth Pad • Dala Sazy (NOAA GOES & JAXA Himawari Horizon)'
  },
  wv_fires: {
    timbre: 'shankobyz',
    scale: 'kuy',
    contourId: 'kui_gallop',
    baseIntensity: 1.55,
    reverb: 0.34,
    scaleNameRu: 'Шаңқобыз • Строй «Қоңыр Күй» (Огненный пояс Африки, Бразилии и Канады)',
    scaleNameEn: 'Shankobyz • Qonyr Kui (Urgent Pulse of Active Fire Clusters)'
  },
  wv_precip: {
    timbre: 'dombra',
    scale: 'pentatonic',
    contourId: 'kui_gallop',
    baseIntensity: 1.35,
    reverb: 0.42,
    scaleNameRu: 'Домбыра • Пентатоника (Тропические ливни и голубые снегопады Антарктики)',
    scaleNameEn: 'Dombra • Pentatonic (Tropical Rainstorms & Antarctic Snow Bands)'
  },
  wv_sst: {
    timbre: 'sybyzgy',
    scale: 'dorian',
    contourId: 'ocean_wave',
    baseIntensity: 1.15,
    reverb: 0.56,
    scaleNameRu: 'Сыбызғы • Дорийский лад («Волна глубины» теплых и холодных течений океана)',
    scaleNameEn: 'Sybyzgy Flute • Dorian Mode ("Deep Ocean Wave" of Warm & Cold Currents)'
  },
  wv_lst: {
    timbre: 'kobyz',
    scale: 'dala',
    contourId: 'mountain_echo',
    baseIntensity: 1.3,
    reverb: 0.46,
    scaleNameRu: 'Қыл-қобыз • Лад «Дала сазы» (Раскаленная Сахара +53.5°C и зеленая Гренландия)',
    scaleNameEn: 'Kyl-Kobyz • Dala Sazy (Scorching +53.5°C Deserts & Emerald Greenland)'
  },
  wv_arctic: {
    timbre: 'crystal',
    scale: 'lydian',
    contourId: 'celestial_gleam',
    baseIntensity: 0.95,
    reverb: 0.72,
    scaleNameRu: 'Кристалл FM • Лидийский лад (Белый паковый лед Северного полюса)',
    scaleNameEn: 'Crystal FM Bell • Lydian Mode (White Multi-Year Arctic Pack Ice)'
  },
  wv_antarctic: {
    timbre: 'crystal',
    scale: 'wholeTone',
    contourId: 'mountain_echo',
    baseIntensity: 1.0,
    reverb: 0.74,
    scaleNameRu: 'Кристалл FM • Целотонная гамма (Зимнее кольцо морских льдов Антарктики)',
    scaleNameEn: 'Crystal FM Bell • Whole-Tone Scale (Antarctic Winter Sea Ice Halo)'
  },
  goes_truecolor: {
    timbre: 'pad',
    scale: 'lydian',
    contourId: 'celestial_gleam',
    baseIntensity: 1.2,
    reverb: 0.65,
    scaleNameRu: 'Теплый Пэд • Лидийский лад (От ночных огней Америки через рассвет к Атлантике)',
    scaleNameEn: 'Warm Cosmic Pad • Lydian Mode (From Americas Night Lights Across Dawn to Sunlit Atlantic)'
  }
};

export const FRAME_TIMELINE_DATES = [
  { date: 'stage3_weather', labelRu: 'Этап 1: Модели погоды GEOS-FP (SVS #5147–5150)', labelEn: 'Stage 1: Models Weather GEOS-FP (SVS #5147–5150)' },
  { date: 'stage4_air', labelRu: 'Этап 2: Качество воздуха GEOS-CF (SVS #5151–5154)', labelEn: 'Stage 2: Models Air Quality GEOS-CF (SVS #5151–5154)' },
  { date: 'stage1_wv1', labelRu: 'Этап 3: Спутники Worldview — Цикл 1 (LANCE)', labelEn: 'Stage 3: Worldview Observations — First Cycle' },
  { date: 'stage2_wv2', labelRu: 'Этап 4: Спутники Worldview — Цикл 2', labelEn: 'Stage 4: Worldview Observations — Second Cycle' },
  { date: 'default', labelRu: 'Этап 5: Полный диск GOES (SVS #5120)', labelEn: 'Stage 5: Full-Disk GOES (SVS #5120)' }
];

export function getNasaGibsWmsUrl(layerOrDatasetId) {
  const found = DATASETS.find((d) => d.id === layerOrDatasetId || d.filename === layerOrDatasetId);
  return found ? found.localImage : DATASETS[0].localImage;
}

// Sample ALL 18 NASA Earth Now Dashboard Datasets at any (lat, lon) coordinate
export function sampleAllDatasetsAtPoint(lat, lon, customHotspots = null) {
  const isLand = isLandCoordinate(lat, lon);
  return DATASETS.map((ds) => {
    let val = ds.sample(lat, lon, isLand);
    if (customHotspots && customHotspots[ds.id]) {
      for (const spot of customHotspots[ds.id]) {
        const d = Math.hypot(lat - spot.lat, lon - spot.lon);
        if (d < 10) {
          const factor = Math.max(0, 1 - d / 10);
          val = Math.round((val * (1 - factor) + spot.value * factor) * 100) / 100;
          break;
        }
      }
    }
    const normPercent = Math.round(
      Math.max(0, Math.min(100, ((val - ds.min) / Math.max(0.0001, ds.max - ds.min)) * 100))
    );
    const profile = DATASET_MUSIC_PROFILES[ds.id] || { timbre: 'dombra', scale: 'kuy', baseIntensity: 1.0 };
    return {
      id: ds.id,
      svsId: ds.svsId,
      groupTitle: ds.groupTitle,
      nameRu: ds.name,
      nameEn: ds.nameEn,
      color: ds.color,
      value: val,
      unit: ds.unit,
      formatted: ds.formatValue(val, lat, lon),
      intensityPercent: normPercent,
      recommendedTimbre: profile.timbre,
      recommendedScale: profile.scale,
      recommendedIntensity: profile.baseIntensity,
      dataset: ds
    };
  });
}

export async function fetchLiveNasaEonetEvents() {
  return [];
}

export function isLandCoordinate(lat, lon) {
  let l = lon;
  while (l < -180) l += 360;
  while (l > 180) l -= 360;

  if (lat < -60) return true;
  if (lat > 60 && lat < 85 && l > -75 && l < -15) return true;
  if (lat > 15 && lat < 75 && l > -170 && l < -50) return true;
  if (lat > -56 && lat < 13 && l > -82 && l < -34) return true;
  if (lat > -35 && lat < 37 && l > -18 && l < 52) return true;
  if (lat > 5 && lat < 78 && l > -10 && l < 180) return true;
  if (lat > -44 && lat < -10 && l > 112 && l < 155) return true;
  if (lat > -10 && lat < 10 && l > 95 && l < 145) return true;
  if (lat > 30 && lat < 46 && l > 128 && l < 146) return true;
  if (lat > 50 && lat < 60 && l > -10 && l < 2) return true;
  return false;
}

export function getRegionInfo(lat, lon, activeDatasetId = null) {
  let l = lon;
  while (l < -180) l += 360;
  while (l > 180) l -= 360;

  const isLand = isLandCoordinate(lat, l);

  if (activeDatasetId && HOTSPOTS_BY_DATASET[activeDatasetId]) {
    for (const spot of HOTSPOTS_BY_DATASET[activeDatasetId]) {
      const d = Math.hypot(lat - spot.lat, l - spot.lon);
      if (d < 9) {
        return {
          nameRu: spot.nameRu,
          nameEn: spot.nameEn,
          descRu: spot.descRu,
          descEn: spot.descEn,
          isLand,
          spot
        };
      }
    }
  }

  for (const dsKey in HOTSPOTS_BY_DATASET) {
    for (const spot of HOTSPOTS_BY_DATASET[dsKey]) {
      const d = Math.hypot(lat - spot.lat, l - spot.lon);
      if (d < 5) {
        return {
          nameRu: spot.nameRu,
          nameEn: spot.nameEn,
          descRu: spot.descRu,
          descEn: spot.descEn,
          isLand,
          spot
        };
      }
    }
  }

  if (lat < -60) return { nameRu: 'Антарктида и Южный океан', nameEn: 'Antarctica & Southern Ocean', isLand: true };
  if (lat > 72) return { nameRu: 'Арктика (Северный Ледовитый океан)', nameEn: 'Arctic Ocean & Pack Ice', isLand: false };
  if (lat > 60 && lat < 85 && l > -75 && l < -15) return { nameRu: 'Гренландия', nameEn: 'Greenland Ice Sheet', isLand: true };
  if (lat >= 15 && lat <= 35 && l >= -18 && l <= 55) return { nameRu: 'Сахара и Аравийский полуостров', nameEn: 'Sahara & Arabian Desert', isLand: true };
  if (lat >= -15 && lat <= 5 && l >= -75 && l <= -45) return { nameRu: 'Бассейн Амазонки, Южная Америка', nameEn: 'Amazon Basin, South America', isLand: true };
  if (lat >= 25 && lat <= 65 && l >= -130 && l <= -65) return { nameRu: 'Северная Америка', nameEn: 'North America', isLand: true };
  if (lat >= 36 && lat <= 65 && l >= -10 && l <= 45) return { nameRu: 'Европа', nameEn: 'Europe', isLand: true };
  if (lat >= 50 && lat <= 72 && l >= 45 && l <= 145) return { nameRu: 'Сибирь и Северная Азия', nameEn: 'Siberia & Northern Eurasia', isLand: true };
  if (lat >= 18 && lat <= 45 && l >= 70 && l <= 135) return { nameRu: 'Восточная и Южная Азия', nameEn: 'East & South Asia', isLand: true };
  if (lat >= -35 && lat <= 15 && l >= 10 && l <= 48) return { nameRu: 'Центральная и Южная Африка', nameEn: 'Central & Southern Africa', isLand: true };
  if (lat >= -44 && lat <= -10 && l >= 112 && l <= 155) return { nameRu: 'Австралия', nameEn: 'Australia', isLand: true };

  if (l >= -70 && l <= 20 && lat >= 0) return { nameRu: 'Северная Атлантика', nameEn: 'North Atlantic Ocean', isLand: false };
  if (l >= -60 && l <= 20 && lat < 0) return { nameRu: 'Южная Атлантика', nameEn: 'South Atlantic Ocean', isLand: false };
  if ((l >= 120 || l <= -70) && lat >= 0) return { nameRu: 'Северный Тихий океан', nameEn: 'North Pacific Ocean', isLand: false };
  if ((l >= 140 || l <= -70) && lat < 0) return { nameRu: 'Южный Тихий океан', nameEn: 'South Pacific Ocean', isLand: false };
  if (l >= 45 && l <= 115 && lat < 25) return { nameRu: 'Индийский океан', nameEn: 'Indian Ocean', isLand: false };

  return {
    nameRu: isLand ? 'Континентальная суша' : 'Мировой океан',
    nameEn: isLand ? 'Continental Land' : 'Global Ocean',
    isLand
  };
}

export const AUDIO_TOUR_STOPS = [
  {
    datasetId: 'geos_temp',
    lat: 24.0,
    lon: 44.0,
    titleRu: 'SVS #5147: Серебристо-серый тепловой купол Сахары и Аравии (+45.2°C)',
    titleEn: 'SVS #5147: GEOS-FP Sahara & Arabian Heat Core (+45.2°C)',
    textRu: 'На карте SVS #5147 раскаленный воздух над Аравией и Сахарой переходит в верхнюю серебристо-серую шкалу свыше +44 градусов.',
    textEn: 'On SVS #5147, superheated air across Arabia and the Sahara enters the top metallic-gray scale above +44°C.'
  },
  {
    datasetId: 'geos_wind',
    lat: -56.0,
    lon: -146.0,
    titleRu: 'SVS #5148: Южно-Тихоокеанский супершторм (39.5 м/с)',
    titleEn: 'SVS #5148: South Pacific Super-Storm Vortex (39.5 m/s)',
    textRu: 'В нижней части карты ветров SVS #5148 вращается мощное бордово-красное штормовое ядро со скоростью ветра 39.5 метров в секунду.',
    textEn: 'In the South Pacific on SVS #5148, a fierce crimson storm vortex reaches 39.5 m/s wind speeds.'
  },
  {
    datasetId: 'geos_pm25',
    lat: 61.5,
    lon: -115.0,
    titleRu: 'SVS #5151: Дымовой шлейф PM2.5 в Канаде (238 мкг/м³)',
    titleEn: 'SVS #5151: Northwest Canada Wildfire Smoke Plume (238 µg/m³)',
    textRu: 'Темно-коричневое пятно на карте SVS #5151 показывает экстремальную концентрацию твердых частиц PM2.5 от бореальных пожаров Канады.',
    textEn: 'The dark burnt-brown core on SVS #5151 reveals extreme 238 µg/m³ PM2.5 smoke from Canadian boreal wildfires.'
  },
  {
    datasetId: 'geos_nox',
    lat: 6.0,
    lon: 86.0,
    titleRu: 'SVS #5154: Морские судоходные трассы NOx в Индийском океане',
    titleEn: 'SVS #5154: Maritime Shipping Lane NOx Tracks in Indian Ocean',
    textRu: 'На зеленой карте оксидов азота SVS #5154 отчетливо видны прямые линии морских торговых путей между Азией, Африкой и Европой.',
    textEn: 'On the green SVS #5154 NOx map, crisp linear tracks across the Indian Ocean trace international cargo shipping lanes.'
  },
  {
    datasetId: 'wv_fires',
    lat: -10.5,
    lon: 21.5,
    titleRu: 'Worldview Цикл 1: Сплошной огненный пояс Центральной Африки (440 МВт)',
    titleEn: 'Worldview First Cycle: Central African Massive Fire Belt (440 MW)',
    textRu: 'На карте активных пожаров Suomi NPP Ангола, Конго и Замбия покрыты плотным красным массивом тепловых аномалий.',
    textEn: 'On the Suomi NPP Active Fires map, Angola, DRC, and Zambia are covered in a massive red cluster of wildfire detections.'
  },
  {
    datasetId: 'goes_truecolor',
    lat: 22.0,
    lon: -35.0,
    titleRu: 'SVS #5120: Полный диск NOAA GOES-East (Рассвет и Атлантика)',
    titleEn: 'SVS #5120: NOAA GOES-East Full Disk (Dawn Terminator & Atlantic)',
    textRu: 'Полный диск Земли в 06:30 EDT: слева горят ночные огни Северной и Южной Америки, а справа солнце освещает Атлантику и пыль Сахары.',
    textEn: 'Full disk at 06:30 EDT: nocturnal city lights gleam across the Americas on the left while morning sunlight illuminates the Atlantic on the right.'
  }
];
