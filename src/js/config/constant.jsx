import React from 'react';

export default {
  SIMS: [
    {
      src: '/img/media/sim_micro_standard.png',
      title: 'Micro / Standard',
      value: 'micro_standard',
      price: 5,
      shipping_price: 5
    },
    {
      src: '/img/media/sim_nano.png',
      title: 'Nano',
      value: 'nano',
      price: 5,
      shipping_price: 5
    }
  ],
  CUSTOMERS: [
    {
      src: '/img/icons/customer_new.svg',
      title: <span>Activate a <br />new SIM</span>,
      value: 'new_customer'
    },
    {
      src: '/img/icons/customer_existing.svg',
      title: <span>Order another<br />SIM</span>,
      value: 'existing_customer'
    },
    {
      src: '/img/icons/customer_replace.svg',
      title: <span>I need to replace<br />my SIM</span>,
      value: 'replace_sim'
    }
  ],
  IDENTIFICATIONS: [
    {
      src: '/img/media/medicare.png',
      title: <span>Medicare<br />card</span>,
      value: 'medicare_card',
      scale: 0.8
    },
    {
      src: '/img/media/licence.png',
      title: <span>Driver<br />licence</span>,
      value: 'driver_licence',
      scale: 0.8
    },
    {
      src: '/img/media/passport.png',
      title: <span>Passport</span>,
      value: 'passport'
    }
  ],
  SELECT_ENERGY_BILL: [
    {
      title: 'Residential',
      image: require('../../img/icons/icon_residential.svg'),
      value: 'Residential',
      disabled: false,
      selected: true
    },
    {
      title: 'Business',
      image: require('../../img/icons/icon_business.svg'),
      value: 'Business',
      disabled: true,
      selected: false
    }
  ],
  SELECT_SOLAR: [
    {
      title: 'Yes',
      image: require('../../img/icons/icon_yes.svg'),
      value: 'Yes'
    },
    {
      title: 'No',
      image: require('../../img/icons/icon_no.svg'),
      value: 'No'
    }
  ],
  SELECT_WATER: [
    {
      title: 'Yes',
      image: require('../../img/icons/icon_yes.svg'),
      value: 'Yes'
    },
    {
      title: 'No',
      image: require('../../img/icons/icon_no.svg'),
      value: 'No'
    }
  ],
  SELECT_TARIFF: [
    {
      title: 'Single rate',
      image: require('../../img/icons/icon_single.svg'),
      value: 'SINGLE',
      selected: true
    },
    {
      title: 'Two rate',
      image: require('../../img/icons/icon_two.svg'),
      value: 'TWO RATE',
      selected: false
    },
    {
      title: 'Three rate',
      image: require('../../img/icons/icon_three.svg'),
      value: 'THREE RATE',
      selected: false
    }
  ],
  PRICINGS: [
    {
      value: 'standard_mobile_pack',
      type: 'primary',
      price: 29,
      cycle: 'per month',
      title: 'Standard Mobile Plan',
      name: 'Standard Mobile Plan',
      data: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      description: '4GB data'
    },
    {
      value: 'super_mobile_pack',
      type: 'danger',
      price: 39,
      cycle: 'per month',
      title: 'Super Mobile Plan',
      name: 'Super Mobile Plan',
      data: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      description: '10GB data'
    },
    {
      value: 'max_mobile_pack',
      type: 'success',
      price: 49,
      cycle: 'per month',
      title: 'Max Mobile Plan',
      name: 'Max Mobile Plan',
      data: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      description: '20GB data'
    }
  ],
  PRICING_MINI_MOBILE: [
    {
      type: 'primary',
      title: 'Standard Plan',
      name: 'Standard Plan',
      price: 29,
      period: <div>inc. GST<br />per month</div>,
      priceDetails: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      resource: {
        amount: '4GB',
        unit: 'data'
      },
      description: ''
    },
    {
      type: 'danger',
      title: 'Super Plan',
      name: 'Super Plan',
      price: 39,
      period: <div>inc. GST<br />per month</div>,
      priceDetails: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      resource: {
        amount: '25GB',
        unit: 'data'
      },
      description: '15GB BONUS + Included 10gb'
    },
    {
      type: 'success',
      title: 'Max Plan',
      name: 'Max Plan',
      price: 49,
      period: <div>inc. GST<br />per month</div>,
      priceDetails: [
        'Unlimited standard calls',
        'Unlimited standard SMS'
      ],
      resource: {
        amount: '45GB',
        unit: 'total data'
      },
      description: '25GB BONUS + Included 20GB'
    }
  ],
  PRICING_MINI_NBN: [
    {
      type: 'primary',
      title: 'Super Plan',
      name: 'Super Plan',
      price: 65,
      period: <div>inc. GST<br />per month</div>,
      priceDetails: [
        <span>Max theoretical speed of:</span>,
        '50Mbps download',
        '20Mbps upload',
        <p>
          <span><a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/WL_NBN_Speeds.pdf">Click HERE for more details</a></span>
        </p>
      ],
      resource: {
        amount: 'Unlimited',
        unit: 'data*'
      }
    },
    {
      type: 'danger',
      title: 'Max Plan',
      name: 'Max Plan',
      price: 85,
      period: <div>inc. GST<br />per month</div>,
      priceDetails: [
        <span>Max theoretical speed of:</span>,
        '100Mbps download',
        '40Mbps upload',
        <p>
          <span><a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/Upoint_NBN_Speed+Tiers_NEW_Speed_Guidelines_Sept2018.pdf">Click HERE for more details</a></span>
        </p>
      ],
      resource: {
        amount: 'Unlimited',
        unit: 'data*'
      }
    }
  ],
  PRICING_DETAILS: [
    {
      value: 'standard_mobile_pack',
      type: 'primary',
      title: 'Standard Plan',
      name: 'Standard Plan',
      price: 29,
      period: 'Per month',
      priceDetails: [
        'for 12 months',
        'Min cost $348'
      ],
      summary: {
        description: 'Critical information summary',
        src: 'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/UPoint_CIS_STANDARD_Mobile_August+2018_V2.pdf'
      },
      resource: {
        amount: '4GB',
        unit: 'data'
      },
      data: [
        {
          title: 'Unlimited standard calls',
          description: 'to standard numbers within Australia'
        },
        {
          title: 'Unlimited standard SMS',
          description: 'to standard numbers within Australia'
        },
        {
          title: '100 Minutes International Calls Included',
          description: 'to landlines in 26 countries'
        }
      ]
    },
    {
      value: 'super_mobile_pack',
      type: 'danger',
      title: 'Super Plan',
      name: 'Super Plan',
      price: 39,
      period: 'Per month',
      priceDetails: [
        'for 12 months',
        'Min cost $468'
      ],
      summary: {
        description: 'Critical information summary',
        src: 'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/CIS_SUPER_Mobile_PROMO_Dec18.pdf'
      },
      resource: {
        amount: '25GB total data',
        unit: '15GB BONUS + Included 10GB'
      },
      data: [
        {
          title: 'Unlimited standard calls',
          description: 'to standard numbers within Australia'
        },
        {
          title: 'Unlimited standard SMS',
          description: 'to standard numbers within Australia'
        },
        {
          title: '300 Minutes International Calls Included',
          description: 'to landlines in 26 countries'
        }
      ]
    },
    {
      value: 'max_mobile_pack',
      type: 'success',
      title: 'Max Plan',
      name: 'Max Plan',
      price: 49,
      period: 'Per month',
      priceDetails: [
        'for 12 months',
        'Min cost $588'
      ],
      summary: {
        description: 'Critical information summary',
        src: 'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/CIS_MAX_Mobile_PROMO_Dec18.pdf'
      },
      resource: {
        amount: '45GB total data',
        unit: '25GB BONUS + Included 20GB'
      },
      data: [
        {
          title: 'Unlimited standard calls',
          description: 'to standard numbers within Australia'
        },
        {
          title: 'Unlimited standard SMS',
          description: 'to standard numbers within Australia'
        },
        {
          title: '300 Minutes International Calls Included',
          description: 'to landlines in 26 countries'
        }
      ]
    }
  ],
  PRICING_NBN_PACKS: [
    {
      value: 'super_nbn_pack',
      type: 'primary',
      title: 'Super',
      name: 'Super NBN Plan',
      pack: '$65 / month',
      price: 65,
      description: <div>Unlimited data*</div>,
      data: [
        <small>Max theoretical speed of:</small>,
        '50Mbps download',
        '20Mbps upload',
        <p>
          <small><a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/Upoint_NBN_Speed+Tiers_NEW_Speed_Guidelines_Sept2018.pdf">Click HERE for more details</a></small>
        </p>
      ]
    },
    {
      value: 'max_nbn_pack',
      type: 'danger',
      title: 'Max',
      name: 'Max NBN Plan',
      pack: '$85 / month',
      price: 85,
      description: <div>Unlimited data*</div>,
      data: [
        <small>Max theoretical speed of:</small>,
        '100Mbps download',
        '40Mbps upload',
        <p>
          <small><a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/Upoint_NBN_Speed+Tiers_NEW_Speed_Guidelines_Sept2018.pdf">Click HERE for more details</a></small>
        </p>
      ]
    }
  ],
  COUNTRIES: {
    AU: 'Australia',
    NZ: 'New Zealand',
    AF: 'Afghanistan',
    AX: 'Åland Islands',
    AL: 'Albania',
    DZ: 'Algeria',
    AS: 'American Samoa',
    AD: 'Andorra',
    AO: 'Angola',
    AI: 'Anguilla',
    AQ: 'Antarctica',
    AG: 'Antigua & Barbuda',
    AR: 'Argentina',
    AM: 'Armenia',
    AW: 'Aruba',
    AC: 'Ascension Island',
    AT: 'Austria',
    AZ: 'Azerbaijan',
    BS: 'Bahamas',
    BH: 'Bahrain',
    BD: 'Bangladesh',
    BB: 'Barbados',
    BY: 'Belarus',
    BE: 'Belgium',
    BZ: 'Belize',
    BJ: 'Benin',
    BM: 'Bermuda',
    BT: 'Bhutan',
    BO: 'Bolivia',
    BA: 'Bosnia & Herzegovina',
    BW: 'Botswana',
    BR: 'Brazil',
    IO: 'British Indian Ocean Territory',
    VG: 'British Virgin Islands',
    BN: 'Brunei',
    BG: 'Bulgaria',
    BF: 'Burkina Faso',
    BI: 'Burundi',
    KH: 'Cambodia',
    CM: 'Cameroon',
    CA: 'Canada',
    IC: 'Canary Islands',
    CV: 'Cape Verde',
    BQ: 'Caribbean Netherlands',
    KY: 'Cayman Islands',
    CF: 'Central African Republic',
    EA: 'Ceuta & Melilla',
    TD: 'Chad',
    CL: 'Chile',
    CN: 'China',
    CX: 'Christmas Island',
    CC: 'Cocos (Keeling) Islands',
    CO: 'Colombia',
    KM: 'Comoros',
    CG: 'Congo - Brazzaville',
    CD: 'Congo - Kinshasa',
    CK: 'Cook Islands',
    CR: 'Costa Rica',
    CI: 'Côte d’Ivoire',
    HR: 'Croatia',
    CU: 'Cuba',
    CW: 'Curaçao',
    CY: 'Cyprus',
    CZ: 'Czechia',
    DK: 'Denmark',
    DG: 'Diego Garcia',
    DJ: 'Djibouti',
    DM: 'Dominica',
    DO: 'Dominican Republic',
    EC: 'Ecuador',
    EG: 'Egypt',
    SV: 'El Salvador',
    GQ: 'Equatorial Guinea',
    ER: 'Eritrea',
    EE: 'Estonia',
    ET: 'Ethiopia',
    EZ: 'Eurozone',
    FK: 'Falkland Islands',
    FO: 'Faroe Islands',
    FJ: 'Fiji',
    FI: 'Finland',
    FR: 'France',
    GF: 'French Guiana',
    PF: 'French Polynesia',
    TF: 'French Southern Territories',
    GA: 'Gabon',
    GM: 'Gambia',
    GE: 'Georgia',
    DE: 'Germany',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GR: 'Greece',
    GL: 'Greenland',
    GD: 'Grenada',
    GP: 'Guadeloupe',
    GU: 'Guam',
    GT: 'Guatemala',
    GG: 'Guernsey',
    GN: 'Guinea',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HT: 'Haiti',
    HN: 'Honduras',
    HK: 'Hong Kong SAR China',
    HU: 'Hungary',
    IS: 'Iceland',
    IN: 'India',
    ID: 'Indonesia',
    IR: 'Iran',
    IQ: 'Iraq',
    IE: 'Ireland',
    IM: 'Isle of Man',
    IL: 'Israel',
    IT: 'Italy',
    JM: 'Jamaica',
    JP: 'Japan',
    JE: 'Jersey',
    JO: 'Jordan',
    KZ: 'Kazakhstan',
    KE: 'Kenya',
    KI: 'Kiribati',
    XK: 'Kosovo',
    KW: 'Kuwait',
    KG: 'Kyrgyzstan',
    LA: 'Laos',
    LV: 'Latvia',
    LB: 'Lebanon',
    LS: 'Lesotho',
    LR: 'Liberia',
    LY: 'Libya',
    LI: 'Liechtenstein',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    MO: 'Macau SAR China',
    MK: 'Macedonia',
    MG: 'Madagascar',
    MW: 'Malawi',
    MY: 'Malaysia',
    MV: 'Maldives',
    ML: 'Mali',
    MT: 'Malta',
    MH: 'Marshall Islands',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MU: 'Mauritius',
    YT: 'Mayotte',
    MX: 'Mexico',
    FM: 'Micronesia',
    MD: 'Moldova',
    MC: 'Monaco',
    MN: 'Mongolia',
    ME: 'Montenegro',
    MS: 'Montserrat',
    MA: 'Morocco',
    MZ: 'Mozambique',
    MM: 'Myanmar (Burma)',
    NA: 'Namibia',
    NR: 'Nauru',
    NP: 'Nepal',
    NL: 'Netherlands',
    NC: 'New Caledonia',
    NI: 'Nicaragua',
    NE: 'Niger',
    NG: 'Nigeria',
    NU: 'Niue',
    NF: 'Norfolk Island',
    KP: 'North Korea',
    MP: 'Northern Mariana Islands',
    NO: 'Norway',
    OM: 'Oman',
    PK: 'Pakistan',
    PW: 'Palau',
    PS: 'Palestinian Territories',
    PA: 'Panama',
    PG: 'Papua New Guinea',
    PY: 'Paraguay',
    PE: 'Peru',
    PH: 'Philippines',
    PN: 'Pitcairn Islands',
    PL: 'Poland',
    PT: 'Portugal',
    PR: 'Puerto Rico',
    QA: 'Qatar',
    RE: 'Réunion',
    RO: 'Romania',
    RU: 'Russia',
    RW: 'Rwanda',
    WS: 'Samoa',
    SM: 'San Marino',
    ST: 'São Tomé & Príncipe',
    SA: 'Saudi Arabia',
    SN: 'Senegal',
    RS: 'Serbia',
    SC: 'Seychelles',
    SL: 'Sierra Leone',
    SG: 'Singapore',
    SX: 'Sint Maarten',
    SK: 'Slovakia',
    SI: 'Slovenia',
    SB: 'Solomon Islands',
    SO: 'Somalia',
    ZA: 'South Africa',
    GS: 'South Georgia & South Sandwich Islands',
    KR: 'South Korea',
    SS: 'South Sudan',
    ES: 'Spain',
    LK: 'Sri Lanka',
    BL: 'St. Barthélemy',
    SH: 'St. Helena',
    KN: 'St. Kitts & Nevis',
    LC: 'St. Lucia',
    MF: 'St. Martin',
    PM: 'St. Pierre & Miquelon',
    VC: 'St. Vincent & Grenadines',
    SD: 'Sudan',
    SR: 'Suriname',
    SJ: 'Svalbard & Jan Mayen',
    SZ: 'Swaziland',
    SE: 'Sweden',
    CH: 'Switzerland',
    SY: 'Syria',
    TW: 'Taiwan',
    TJ: 'Tajikistan',
    TZ: 'Tanzania',
    TH: 'Thailand',
    TL: 'Timor-Leste',
    TG: 'Togo',
    TK: 'Tokelau',
    TO: 'Tonga',
    TT: 'Trinidad & Tobago',
    TA: 'Tristan da Cunha',
    TN: 'Tunisia',
    TR: 'Turkey',
    TM: 'Turkmenistan',
    TC: 'Turks & Caicos Islands',
    TV: 'Tuvalu',
    UM: 'U.S. Outlying Islands',
    VI: 'U.S. Virgin Islands',
    UG: 'Uganda',
    UA: 'Ukraine',
    AE: 'United Arab Emirates',
    GB: 'United Kingdom',
    UN: 'United Nations',
    US: 'United States',
    UY: 'Uruguay',
    UZ: 'Uzbekistan',
    VU: 'Vanuatu',
    VA: 'Vatican City',
    VE: 'Venezuela',
    VN: 'Vietnam',
    WF: 'Wallis & Futuna',
    EH: 'Western Sahara',
    YE: 'Yemen',
    ZM: 'Zambia',
    ZW: 'Zimbabwe'
  },
  CURRIENCIES: {
    USD: {
      symbol: '$',
      name: 'US Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'USD',
      name_plural: 'US dollars'
    },
    CAD: {
      symbol: 'CA$',
      name: 'Canadian Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'CAD',
      name_plural: 'Canadian dollars'
    },
    EUR: {
      symbol: '€',
      name: 'Euro',
      symbol_native: '€',
      decimal_digits: 2,
      rounding: 0,
      code: 'EUR',
      name_plural: 'euros'
    },
    AED: {
      symbol: 'AED',
      name: 'United Arab Emirates Dirham',
      symbol_native: 'د.إ.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'AED',
      name_plural: 'UAE dirhams'
    },
    AFN: {
      symbol: 'Af',
      name: 'Afghan Afghani',
      symbol_native: '؋',
      decimal_digits: 0,
      rounding: 0,
      code: 'AFN',
      name_plural: 'Afghan Afghanis'
    },
    ALL: {
      symbol: 'ALL',
      name: 'Albanian Lek',
      symbol_native: 'Lek',
      decimal_digits: 0,
      rounding: 0,
      code: 'ALL',
      name_plural: 'Albanian lekë'
    },
    AMD: {
      symbol: 'AMD',
      name: 'Armenian Dram',
      symbol_native: 'դր.',
      decimal_digits: 0,
      rounding: 0,
      code: 'AMD',
      name_plural: 'Armenian drams'
    },
    ARS: {
      symbol: 'AR$',
      name: 'Argentine Peso',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'ARS',
      name_plural: 'Argentine pesos'
    },
    AUD: {
      symbol: 'AU$',
      name: 'Australian Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'AUD',
      name_plural: 'Australian dollars'
    },
    AZN: {
      symbol: 'man.',
      name: 'Azerbaijani Manat',
      symbol_native: 'ман.',
      decimal_digits: 2,
      rounding: 0,
      code: 'AZN',
      name_plural: 'Azerbaijani manats'
    },
    BAM: {
      symbol: 'KM',
      name: 'Bosnia-Herzegovina Convertible Mark',
      symbol_native: 'KM',
      decimal_digits: 2,
      rounding: 0,
      code: 'BAM',
      name_plural: 'Bosnia-Herzegovina convertible marks'
    },
    BDT: {
      symbol: 'Tk',
      name: 'Bangladeshi Taka',
      symbol_native: '৳',
      decimal_digits: 2,
      rounding: 0,
      code: 'BDT',
      name_plural: 'Bangladeshi takas'
    },
    BGN: {
      symbol: 'BGN',
      name: 'Bulgarian Lev',
      symbol_native: 'лв.',
      decimal_digits: 2,
      rounding: 0,
      code: 'BGN',
      name_plural: 'Bulgarian leva'
    },
    BHD: {
      symbol: 'BD',
      name: 'Bahraini Dinar',
      symbol_native: 'د.ب.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'BHD',
      name_plural: 'Bahraini dinars'
    },
    BIF: {
      symbol: 'FBu',
      name: 'Burundian Franc',
      symbol_native: 'FBu',
      decimal_digits: 0,
      rounding: 0,
      code: 'BIF',
      name_plural: 'Burundian francs'
    },
    BND: {
      symbol: 'BN$',
      name: 'Brunei Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'BND',
      name_plural: 'Brunei dollars'
    },
    BOB: {
      symbol: 'Bs',
      name: 'Bolivian Boliviano',
      symbol_native: 'Bs',
      decimal_digits: 2,
      rounding: 0,
      code: 'BOB',
      name_plural: 'Bolivian bolivianos'
    },
    BRL: {
      symbol: 'R$',
      name: 'Brazilian Real',
      symbol_native: 'R$',
      decimal_digits: 2,
      rounding: 0,
      code: 'BRL',
      name_plural: 'Brazilian reals'
    },
    BWP: {
      symbol: 'BWP',
      name: 'Botswanan Pula',
      symbol_native: 'P',
      decimal_digits: 2,
      rounding: 0,
      code: 'BWP',
      name_plural: 'Botswanan pulas'
    },
    BYR: {
      symbol: 'BYR',
      name: 'Belarusian Ruble',
      symbol_native: 'BYR',
      decimal_digits: 0,
      rounding: 0,
      code: 'BYR',
      name_plural: 'Belarusian rubles'
    },
    BZD: {
      symbol: 'BZ$',
      name: 'Belize Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'BZD',
      name_plural: 'Belize dollars'
    },
    CDF: {
      symbol: 'CDF',
      name: 'Congolese Franc',
      symbol_native: 'FrCD',
      decimal_digits: 2,
      rounding: 0,
      code: 'CDF',
      name_plural: 'Congolese francs'
    },
    CHF: {
      symbol: 'CHF',
      name: 'Swiss Franc',
      symbol_native: 'CHF',
      decimal_digits: 2,
      rounding: 0.05,
      code: 'CHF',
      name_plural: 'Swiss francs'
    },
    CLP: {
      symbol: 'CL$',
      name: 'Chilean Peso',
      symbol_native: '$',
      decimal_digits: 0,
      rounding: 0,
      code: 'CLP',
      name_plural: 'Chilean pesos'
    },
    CNY: {
      symbol: 'CN¥',
      name: 'Chinese Yuan',
      symbol_native: 'CN¥',
      decimal_digits: 2,
      rounding: 0,
      code: 'CNY',
      name_plural: 'Chinese yuan'
    },
    COP: {
      symbol: 'CO$',
      name: 'Colombian Peso',
      symbol_native: '$',
      decimal_digits: 0,
      rounding: 0,
      code: 'COP',
      name_plural: 'Colombian pesos'
    },
    CRC: {
      symbol: '₡',
      name: 'Costa Rican Colón',
      symbol_native: '₡',
      decimal_digits: 0,
      rounding: 0,
      code: 'CRC',
      name_plural: 'Costa Rican colóns'
    },
    CVE: {
      symbol: 'CV$',
      name: 'Cape Verdean Escudo',
      symbol_native: 'CV$',
      decimal_digits: 2,
      rounding: 0,
      code: 'CVE',
      name_plural: 'Cape Verdean escudos'
    },
    CZK: {
      symbol: 'Kč',
      name: 'Czech Republic Koruna',
      symbol_native: 'Kč',
      decimal_digits: 2,
      rounding: 0,
      code: 'CZK',
      name_plural: 'Czech Republic korunas'
    },
    DJF: {
      symbol: 'Fdj',
      name: 'Djiboutian Franc',
      symbol_native: 'Fdj',
      decimal_digits: 0,
      rounding: 0,
      code: 'DJF',
      name_plural: 'Djiboutian francs'
    },
    DKK: {
      symbol: 'Dkr',
      name: 'Danish Krone',
      symbol_native: 'kr',
      decimal_digits: 2,
      rounding: 0,
      code: 'DKK',
      name_plural: 'Danish kroner'
    },
    DOP: {
      symbol: 'RD$',
      name: 'Dominican Peso',
      symbol_native: 'RD$',
      decimal_digits: 2,
      rounding: 0,
      code: 'DOP',
      name_plural: 'Dominican pesos'
    },
    DZD: {
      symbol: 'DA',
      name: 'Algerian Dinar',
      symbol_native: 'د.ج.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'DZD',
      name_plural: 'Algerian dinars'
    },
    EEK: {
      symbol: 'Ekr',
      name: 'Estonian Kroon',
      symbol_native: 'kr',
      decimal_digits: 2,
      rounding: 0,
      code: 'EEK',
      name_plural: 'Estonian kroons'
    },
    EGP: {
      symbol: 'EGP',
      name: 'Egyptian Pound',
      symbol_native: 'ج.م.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'EGP',
      name_plural: 'Egyptian pounds'
    },
    ERN: {
      symbol: 'Nfk',
      name: 'Eritrean Nakfa',
      symbol_native: 'Nfk',
      decimal_digits: 2,
      rounding: 0,
      code: 'ERN',
      name_plural: 'Eritrean nakfas'
    },
    ETB: {
      symbol: 'Br',
      name: 'Ethiopian Birr',
      symbol_native: 'Br',
      decimal_digits: 2,
      rounding: 0,
      code: 'ETB',
      name_plural: 'Ethiopian birrs'
    },
    GBP: {
      symbol: '£',
      name: 'British Pound Sterling',
      symbol_native: '£',
      decimal_digits: 2,
      rounding: 0,
      code: 'GBP',
      name_plural: 'British pounds sterling'
    },
    GEL: {
      symbol: 'GEL',
      name: 'Georgian Lari',
      symbol_native: 'GEL',
      decimal_digits: 2,
      rounding: 0,
      code: 'GEL',
      name_plural: 'Georgian laris'
    },
    GHS: {
      symbol: 'GH₵',
      name: 'Ghanaian Cedi',
      symbol_native: 'GH₵',
      decimal_digits: 2,
      rounding: 0,
      code: 'GHS',
      name_plural: 'Ghanaian cedis'
    },
    GNF: {
      symbol: 'FG',
      name: 'Guinean Franc',
      symbol_native: 'FG',
      decimal_digits: 0,
      rounding: 0,
      code: 'GNF',
      name_plural: 'Guinean francs'
    },
    GTQ: {
      symbol: 'GTQ',
      name: 'Guatemalan Quetzal',
      symbol_native: 'Q',
      decimal_digits: 2,
      rounding: 0,
      code: 'GTQ',
      name_plural: 'Guatemalan quetzals'
    },
    HKD: {
      symbol: 'HK$',
      name: 'Hong Kong Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'HKD',
      name_plural: 'Hong Kong dollars'
    },
    HNL: {
      symbol: 'HNL',
      name: 'Honduran Lempira',
      symbol_native: 'L',
      decimal_digits: 2,
      rounding: 0,
      code: 'HNL',
      name_plural: 'Honduran lempiras'
    },
    HRK: {
      symbol: 'kn',
      name: 'Croatian Kuna',
      symbol_native: 'kn',
      decimal_digits: 2,
      rounding: 0,
      code: 'HRK',
      name_plural: 'Croatian kunas'
    },
    HUF: {
      symbol: 'Ft',
      name: 'Hungarian Forint',
      symbol_native: 'Ft',
      decimal_digits: 0,
      rounding: 0,
      code: 'HUF',
      name_plural: 'Hungarian forints'
    },
    IDR: {
      symbol: 'Rp',
      name: 'Indonesian Rupiah',
      symbol_native: 'Rp',
      decimal_digits: 0,
      rounding: 0,
      code: 'IDR',
      name_plural: 'Indonesian rupiahs'
    },
    ILS: {
      symbol: '₪',
      name: 'Israeli New Sheqel',
      symbol_native: '₪',
      decimal_digits: 2,
      rounding: 0,
      code: 'ILS',
      name_plural: 'Israeli new sheqels'
    },
    INR: {
      symbol: 'Rs',
      name: 'Indian Rupee',
      symbol_native: 'টকা',
      decimal_digits: 2,
      rounding: 0,
      code: 'INR',
      name_plural: 'Indian rupees'
    },
    IQD: {
      symbol: 'IQD',
      name: 'Iraqi Dinar',
      symbol_native: 'د.ع.\u200f',
      decimal_digits: 0,
      rounding: 0,
      code: 'IQD',
      name_plural: 'Iraqi dinars'
    },
    IRR: {
      symbol: 'IRR',
      name: 'Iranian Rial',
      symbol_native: '﷼',
      decimal_digits: 0,
      rounding: 0,
      code: 'IRR',
      name_plural: 'Iranian rials'
    },
    ISK: {
      symbol: 'Ikr',
      name: 'Icelandic Króna',
      symbol_native: 'kr',
      decimal_digits: 0,
      rounding: 0,
      code: 'ISK',
      name_plural: 'Icelandic krónur'
    },
    JMD: {
      symbol: 'J$',
      name: 'Jamaican Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'JMD',
      name_plural: 'Jamaican dollars'
    },
    JOD: {
      symbol: 'JD',
      name: 'Jordanian Dinar',
      symbol_native: 'د.أ.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'JOD',
      name_plural: 'Jordanian dinars'
    },
    JPY: {
      symbol: '¥',
      name: 'Japanese Yen',
      symbol_native: '￥',
      decimal_digits: 0,
      rounding: 0,
      code: 'JPY',
      name_plural: 'Japanese yen'
    },
    KES: {
      symbol: 'Ksh',
      name: 'Kenyan Shilling',
      symbol_native: 'Ksh',
      decimal_digits: 2,
      rounding: 0,
      code: 'KES',
      name_plural: 'Kenyan shillings'
    },
    KHR: {
      symbol: 'KHR',
      name: 'Cambodian Riel',
      symbol_native: '៛',
      decimal_digits: 2,
      rounding: 0,
      code: 'KHR',
      name_plural: 'Cambodian riels'
    },
    KMF: {
      symbol: 'CF',
      name: 'Comorian Franc',
      symbol_native: 'FC',
      decimal_digits: 0,
      rounding: 0,
      code: 'KMF',
      name_plural: 'Comorian francs'
    },
    KRW: {
      symbol: '₩',
      name: 'South Korean Won',
      symbol_native: '₩',
      decimal_digits: 0,
      rounding: 0,
      code: 'KRW',
      name_plural: 'South Korean won'
    },
    KWD: {
      symbol: 'KD',
      name: 'Kuwaiti Dinar',
      symbol_native: 'د.ك.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'KWD',
      name_plural: 'Kuwaiti dinars'
    },
    KZT: {
      symbol: 'KZT',
      name: 'Kazakhstani Tenge',
      symbol_native: 'тңг.',
      decimal_digits: 2,
      rounding: 0,
      code: 'KZT',
      name_plural: 'Kazakhstani tenges'
    },
    LBP: {
      symbol: 'LB£',
      name: 'Lebanese Pound',
      symbol_native: 'ل.ل.\u200f',
      decimal_digits: 0,
      rounding: 0,
      code: 'LBP',
      name_plural: 'Lebanese pounds'
    },
    LKR: {
      symbol: 'SLRs',
      name: 'Sri Lankan Rupee',
      symbol_native: 'SL Re',
      decimal_digits: 2,
      rounding: 0,
      code: 'LKR',
      name_plural: 'Sri Lankan rupees'
    },
    LTL: {
      symbol: 'Lt',
      name: 'Lithuanian Litas',
      symbol_native: 'Lt',
      decimal_digits: 2,
      rounding: 0,
      code: 'LTL',
      name_plural: 'Lithuanian litai'
    },
    LVL: {
      symbol: 'Ls',
      name: 'Latvian Lats',
      symbol_native: 'Ls',
      decimal_digits: 2,
      rounding: 0,
      code: 'LVL',
      name_plural: 'Latvian lati'
    },
    LYD: {
      symbol: 'LD',
      name: 'Libyan Dinar',
      symbol_native: 'د.ل.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'LYD',
      name_plural: 'Libyan dinars'
    },
    MAD: {
      symbol: 'MAD',
      name: 'Moroccan Dirham',
      symbol_native: 'د.م.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'MAD',
      name_plural: 'Moroccan dirhams'
    },
    MDL: {
      symbol: 'MDL',
      name: 'Moldovan Leu',
      symbol_native: 'MDL',
      decimal_digits: 2,
      rounding: 0,
      code: 'MDL',
      name_plural: 'Moldovan lei'
    },
    MGA: {
      symbol: 'MGA',
      name: 'Malagasy Ariary',
      symbol_native: 'MGA',
      decimal_digits: 0,
      rounding: 0,
      code: 'MGA',
      name_plural: 'Malagasy Ariaries'
    },
    MKD: {
      symbol: 'MKD',
      name: 'Macedonian Denar',
      symbol_native: 'MKD',
      decimal_digits: 2,
      rounding: 0,
      code: 'MKD',
      name_plural: 'Macedonian denari'
    },
    MMK: {
      symbol: 'MMK',
      name: 'Myanma Kyat',
      symbol_native: 'K',
      decimal_digits: 0,
      rounding: 0,
      code: 'MMK',
      name_plural: 'Myanma kyats'
    },
    MOP: {
      symbol: 'MOP$',
      name: 'Macanese Pataca',
      symbol_native: 'MOP$',
      decimal_digits: 2,
      rounding: 0,
      code: 'MOP',
      name_plural: 'Macanese patacas'
    },
    MUR: {
      symbol: 'MURs',
      name: 'Mauritian Rupee',
      symbol_native: 'MURs',
      decimal_digits: 0,
      rounding: 0,
      code: 'MUR',
      name_plural: 'Mauritian rupees'
    },
    MXN: {
      symbol: 'MX$',
      name: 'Mexican Peso',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'MXN',
      name_plural: 'Mexican pesos'
    },
    MYR: {
      symbol: 'RM',
      name: 'Malaysian Ringgit',
      symbol_native: 'RM',
      decimal_digits: 2,
      rounding: 0,
      code: 'MYR',
      name_plural: 'Malaysian ringgits'
    },
    MZN: {
      symbol: 'MTn',
      name: 'Mozambican Metical',
      symbol_native: 'MTn',
      decimal_digits: 2,
      rounding: 0,
      code: 'MZN',
      name_plural: 'Mozambican meticals'
    },
    NAD: {
      symbol: 'N$',
      name: 'Namibian Dollar',
      symbol_native: 'N$',
      decimal_digits: 2,
      rounding: 0,
      code: 'NAD',
      name_plural: 'Namibian dollars'
    },
    NGN: {
      symbol: '₦',
      name: 'Nigerian Naira',
      symbol_native: '₦',
      decimal_digits: 2,
      rounding: 0,
      code: 'NGN',
      name_plural: 'Nigerian nairas'
    },
    NIO: {
      symbol: 'C$',
      name: 'Nicaraguan Córdoba',
      symbol_native: 'C$',
      decimal_digits: 2,
      rounding: 0,
      code: 'NIO',
      name_plural: 'Nicaraguan córdobas'
    },
    NOK: {
      symbol: 'Nkr',
      name: 'Norwegian Krone',
      symbol_native: 'kr',
      decimal_digits: 2,
      rounding: 0,
      code: 'NOK',
      name_plural: 'Norwegian kroner'
    },
    NPR: {
      symbol: 'NPRs',
      name: 'Nepalese Rupee',
      symbol_native: 'नेरू',
      decimal_digits: 2,
      rounding: 0,
      code: 'NPR',
      name_plural: 'Nepalese rupees'
    },
    NZD: {
      symbol: 'NZ$',
      name: 'New Zealand Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'NZD',
      name_plural: 'New Zealand dollars'
    },
    OMR: {
      symbol: 'OMR',
      name: 'Omani Rial',
      symbol_native: 'ر.ع.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'OMR',
      name_plural: 'Omani rials'
    },
    PAB: {
      symbol: 'B/.',
      name: 'Panamanian Balboa',
      symbol_native: 'B/.',
      decimal_digits: 2,
      rounding: 0,
      code: 'PAB',
      name_plural: 'Panamanian balboas'
    },
    PEN: {
      symbol: 'S/.',
      name: 'Peruvian Nuevo Sol',
      symbol_native: 'S/.',
      decimal_digits: 2,
      rounding: 0,
      code: 'PEN',
      name_plural: 'Peruvian nuevos soles'
    },
    PHP: {
      symbol: '₱',
      name: 'Philippine Peso',
      symbol_native: '₱',
      decimal_digits: 2,
      rounding: 0,
      code: 'PHP',
      name_plural: 'Philippine pesos'
    },
    PKR: {
      symbol: 'PKRs',
      name: 'Pakistani Rupee',
      symbol_native: '₨',
      decimal_digits: 0,
      rounding: 0,
      code: 'PKR',
      name_plural: 'Pakistani rupees'
    },
    PLN: {
      symbol: 'zł',
      name: 'Polish Zloty',
      symbol_native: 'zł',
      decimal_digits: 2,
      rounding: 0,
      code: 'PLN',
      name_plural: 'Polish zlotys'
    },
    PYG: {
      symbol: '₲',
      name: 'Paraguayan Guarani',
      symbol_native: '₲',
      decimal_digits: 0,
      rounding: 0,
      code: 'PYG',
      name_plural: 'Paraguayan guaranis'
    },
    QAR: {
      symbol: 'QR',
      name: 'Qatari Rial',
      symbol_native: 'ر.ق.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'QAR',
      name_plural: 'Qatari rials'
    },
    RON: {
      symbol: 'RON',
      name: 'Romanian Leu',
      symbol_native: 'RON',
      decimal_digits: 2,
      rounding: 0,
      code: 'RON',
      name_plural: 'Romanian lei'
    },
    RSD: {
      symbol: 'din.',
      name: 'Serbian Dinar',
      symbol_native: 'дин.',
      decimal_digits: 0,
      rounding: 0,
      code: 'RSD',
      name_plural: 'Serbian dinars'
    },
    RUB: {
      symbol: 'RUB',
      name: 'Russian Ruble',
      symbol_native: 'руб.',
      decimal_digits: 2,
      rounding: 0,
      code: 'RUB',
      name_plural: 'Russian rubles'
    },
    RWF: {
      symbol: 'RWF',
      name: 'Rwandan Franc',
      symbol_native: 'FR',
      decimal_digits: 0,
      rounding: 0,
      code: 'RWF',
      name_plural: 'Rwandan francs'
    },
    SAR: {
      symbol: 'SR',
      name: 'Saudi Riyal',
      symbol_native: 'ر.س.\u200f',
      decimal_digits: 2,
      rounding: 0,
      code: 'SAR',
      name_plural: 'Saudi riyals'
    },
    SDG: {
      symbol: 'SDG',
      name: 'Sudanese Pound',
      symbol_native: 'SDG',
      decimal_digits: 2,
      rounding: 0,
      code: 'SDG',
      name_plural: 'Sudanese pounds'
    },
    SEK: {
      symbol: 'Skr',
      name: 'Swedish Krona',
      symbol_native: 'kr',
      decimal_digits: 2,
      rounding: 0,
      code: 'SEK',
      name_plural: 'Swedish kronor'
    },
    SGD: {
      symbol: 'S$',
      name: 'Singapore Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'SGD',
      name_plural: 'Singapore dollars'
    },
    SOS: {
      symbol: 'Ssh',
      name: 'Somali Shilling',
      symbol_native: 'Ssh',
      decimal_digits: 0,
      rounding: 0,
      code: 'SOS',
      name_plural: 'Somali shillings'
    },
    SYP: {
      symbol: 'SY£',
      name: 'Syrian Pound',
      symbol_native: 'ل.س.\u200f',
      decimal_digits: 0,
      rounding: 0,
      code: 'SYP',
      name_plural: 'Syrian pounds'
    },
    THB: {
      symbol: '฿',
      name: 'Thai Baht',
      symbol_native: '฿',
      decimal_digits: 2,
      rounding: 0,
      code: 'THB',
      name_plural: 'Thai baht'
    },
    TND: {
      symbol: 'DT',
      name: 'Tunisian Dinar',
      symbol_native: 'د.ت.\u200f',
      decimal_digits: 3,
      rounding: 0,
      code: 'TND',
      name_plural: 'Tunisian dinars'
    },
    TOP: {
      symbol: 'T$',
      name: 'Tongan Paʻanga',
      symbol_native: 'T$',
      decimal_digits: 2,
      rounding: 0,
      code: 'TOP',
      name_plural: 'Tongan paʻanga'
    },
    TRY: {
      symbol: 'TL',
      name: 'Turkish Lira',
      symbol_native: 'TL',
      decimal_digits: 2,
      rounding: 0,
      code: 'TRY',
      name_plural: 'Turkish Lira'
    },
    TTD: {
      symbol: 'TT$',
      name: 'Trinidad and Tobago Dollar',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'TTD',
      name_plural: 'Trinidad and Tobago dollars'
    },
    TWD: {
      symbol: 'NT$',
      name: 'New Taiwan Dollar',
      symbol_native: 'NT$',
      decimal_digits: 2,
      rounding: 0,
      code: 'TWD',
      name_plural: 'New Taiwan dollars'
    },
    TZS: {
      symbol: 'TSh',
      name: 'Tanzanian Shilling',
      symbol_native: 'TSh',
      decimal_digits: 0,
      rounding: 0,
      code: 'TZS',
      name_plural: 'Tanzanian shillings'
    },
    UAH: {
      symbol: '₴',
      name: 'Ukrainian Hryvnia',
      symbol_native: '₴',
      decimal_digits: 2,
      rounding: 0,
      code: 'UAH',
      name_plural: 'Ukrainian hryvnias'
    },
    UGX: {
      symbol: 'USh',
      name: 'Ugandan Shilling',
      symbol_native: 'USh',
      decimal_digits: 0,
      rounding: 0,
      code: 'UGX',
      name_plural: 'Ugandan shillings'
    },
    UYU: {
      symbol: '$U',
      name: 'Uruguayan Peso',
      symbol_native: '$',
      decimal_digits: 2,
      rounding: 0,
      code: 'UYU',
      name_plural: 'Uruguayan pesos'
    },
    UZS: {
      symbol: 'UZS',
      name: 'Uzbekistan Som',
      symbol_native: 'UZS',
      decimal_digits: 0,
      rounding: 0,
      code: 'UZS',
      name_plural: 'Uzbekistan som'
    },
    VEF: {
      symbol: 'Bs.F.',
      name: 'Venezuelan Bolívar',
      symbol_native: 'Bs.F.',
      decimal_digits: 2,
      rounding: 0,
      code: 'VEF',
      name_plural: 'Venezuelan bolívars'
    },
    VND: {
      symbol: '₫',
      name: 'Vietnamese Dong',
      symbol_native: '₫',
      decimal_digits: 0,
      rounding: 0,
      code: 'VND',
      name_plural: 'Vietnamese dong'
    },
    XAF: {
      symbol: 'FCFA',
      name: 'CFA Franc BEAC',
      symbol_native: 'FCFA',
      decimal_digits: 0,
      rounding: 0,
      code: 'XAF',
      name_plural: 'CFA francs BEAC'
    },
    XOF: {
      symbol: 'CFA',
      name: 'CFA Franc BCEAO',
      symbol_native: 'CFA',
      decimal_digits: 0,
      rounding: 0,
      code: 'XOF',
      name_plural: 'CFA francs BCEAO'
    },
    YER: {
      symbol: 'YR',
      name: 'Yemeni Rial',
      symbol_native: 'ر.ي.\u200f',
      decimal_digits: 0,
      rounding: 0,
      code: 'YER',
      name_plural: 'Yemeni rials'
    },
    ZAR: {
      symbol: 'R',
      name: 'South African Rand',
      symbol_native: 'R',
      decimal_digits: 2,
      rounding: 0,
      code: 'ZAR',
      name_plural: 'South African rand'
    },
    ZMK: {
      symbol: 'ZK',
      name: 'Zambian Kwacha',
      symbol_native: 'ZK',
      decimal_digits: 0,
      rounding: 0,
      code: 'ZMK',
      name_plural: 'Zambian kwachas'
    }
  }
};

export const ConstantHelper = {

};
