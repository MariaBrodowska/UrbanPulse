export const sampleFilters = [
    "ID",
    "By Year",
    "By City",
]

export const sampleCallbacks = [
    () => {
        return <div>
                <p>Filter By ID</p>
                <form id="filterform">
                    <input type="number" id="filterID"></input>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
    },
    () => {

        return <div>
                <p>Filter By Year</p>
                <form id="filterform">
                    <input type="number" id="filterYear"></input>
                    <input type="submit"value="Submit" />
                </form>
            </div>
    },
    () => {
        return <div>
                <p>Filter By City</p>
                <form id="filterform">
                    <input type="text" id="filterCity"></input>
                    <input type="submit">Submit</input>
                </form>
            </div>
    }
]

export const sampledata = [
    {
        "id": 1,
        "year": 2015,
        "number": 81190,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 2,
        "year": 2016,
        "number": 80889,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 3,
        "year": 2017,
        "number": 80325,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 4,
        "year": 2018,
        "number": 79686,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 5,
        "year": 2019,
        "number": 79200,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 6,
        "year": 2020,
        "number": 77981,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 7,
        "year": 2021,
        "number": 77011,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 8,
        "year": 2022,
        "number": 76184,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 9,
        "year": 2023,
        "number": 75429,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 10,
        "year": 2024,
        "number": 74636,
        "cityId": 1,
        "cityName": "Jelenia"
    },
    {
        "id": 11,
        "year": 2015,
        "number": 101133,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 12,
        "year": 2016,
        "number": 100769,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 13,
        "year": 2017,
        "number": 100455,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 14,
        "year": 2018,
        "number": 100081,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 15,
        "year": 2019,
        "number": 99486,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 16,
        "year": 2020,
        "number": 95771,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 17,
        "year": 2021,
        "number": 94646,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 18,
        "year": 2022,
        "number": 93473,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 19,
        "year": 2023,
        "number": 92568,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 20,
        "year": 2024,
        "number": 91335,
        "cityId": 2,
        "cityName": "Legnica"
    },
    {
        "id": 21,
        "year": 2015,
        "number": 634404,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 22,
        "year": 2016,
        "number": 637075,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 23,
        "year": 2017,
        "number": 638364,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 24,
        "year": 2018,
        "number": 639258,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 25,
        "year": 2019,
        "number": 641607,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 26,
        "year": 2020,
        "number": 675446,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 27,
        "year": 2021,
        "number": 672826,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 28,
        "year": 2022,
        "number": 673923,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 29,
        "year": 2023,
        "number": 674132,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 30,
        "year": 2024,
        "number": 673531,
        "cityId": 3,
        "cityName": "Wroclaw"
    },
    {
        "id": 31,
        "year": 2015,
        "number": 116069,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 32,
        "year": 2016,
        "number": 114930,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 33,
        "year": 2017,
        "number": 114065,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 34,
        "year": 2018,
        "number": 113100,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 35,
        "year": 2019,
        "number": 111896,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 36,
        "year": 2020,
        "number": 105639,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 37,
        "year": 2021,
        "number": 103985,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 38,
        "year": 2022,
        "number": 102490,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 39,
        "year": 2023,
        "number": 101082,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 40,
        "year": 2024,
        "number": 99463,
        "cityId": 4,
        "cityName": "Walbrzych"
    },
    {
        "id": 41,
        "year": 2015,
        "number": 356961,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 42,
        "year": 2016,
        "number": 354990,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 43,
        "year": 2017,
        "number": 353215,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 44,
        "year": 2018,
        "number": 351254,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 45,
        "year": 2019,
        "number": 349021,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 46,
        "year": 2020,
        "number": 341716,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 47,
        "year": 2021,
        "number": 336665,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 48,
        "year": 2022,
        "number": 331898,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 49,
        "year": 2023,
        "number": 328370,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 50,
        "year": 2024,
        "number": 324984,
        "cityId": 5,
        "cityName": "Bydgoszcz"
    },
    {
        "id": 51,
        "year": 2015,
        "number": 96887,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 52,
        "year": 2016,
        "number": 96111,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 53,
        "year": 2017,
        "number": 95781,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 54,
        "year": 2018,
        "number": 95354,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 55,
        "year": 2019,
        "number": 94732,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 56,
        "year": 2020,
        "number": 91801,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 57,
        "year": 2021,
        "number": 90617,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 58,
        "year": 2022,
        "number": 89832,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 59,
        "year": 2023,
        "number": 89081,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 60,
        "year": 2024,
        "number": 88214,
        "cityId": 6,
        "cityName": "Grudziadz"
    },
    {
        "id": 61,
        "year": 2015,
        "number": 202939,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 62,
        "year": 2016,
        "number": 202591,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 63,
        "year": 2017,
        "number": 202495,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 64,
        "year": 2018,
        "number": 202482,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 65,
        "year": 2019,
        "number": 201798,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 66,
        "year": 2020,
        "number": 201294,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 67,
        "year": 2021,
        "number": 197989,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 68,
        "year": 2022,
        "number": 196298,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 69,
        "year": 2023,
        "number": 195263,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 70,
        "year": 2024,
        "number": 194273,
        "cityId": 7,
        "cityName": "Torun"
    },
    {
        "id": 71,
        "year": 2015,
        "number": 113432,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 72,
        "year": 2016,
        "number": 112635,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 73,
        "year": 2017,
        "number": 112106,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 74,
        "year": 2018,
        "number": 111319,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 75,
        "year": 2019,
        "number": 110287,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 76,
        "year": 2020,
        "number": 105966,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 77,
        "year": 2021,
        "number": 104352,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 78,
        "year": 2022,
        "number": 102730,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 79,
        "year": 2023,
        "number": 101450,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 80,
        "year": 2024,
        "number": 100125,
        "cityId": 8,
        "cityName": "Wloclawek"
    },
    {
        "id": 81,
        "year": 2015,
        "number": 57498,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 82,
        "year": 2016,
        "number": 57389,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 83,
        "year": 2017,
        "number": 57339,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 84,
        "year": 2018,
        "number": 57498,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 85,
        "year": 2019,
        "number": 57264,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 86,
        "year": 2020,
        "number": 55784,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 87,
        "year": 2021,
        "number": 55362,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 88,
        "year": 2022,
        "number": 54926,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 89,
        "year": 2023,
        "number": 54581,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 90,
        "year": 2024,
        "number": 54178,
        "cityId": 9,
        "cityName": "Biala"
    },
    {
        "id": 91,
        "year": 2015,
        "number": 64625,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 92,
        "year": 2016,
        "number": 63949,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 93,
        "year": 2017,
        "number": 63529,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 94,
        "year": 2018,
        "number": 63029,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 95,
        "year": 2019,
        "number": 62331,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 96,
        "year": 2020,
        "number": 60164,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 97,
        "year": 2021,
        "number": 59312,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 98,
        "year": 2022,
        "number": 58357,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 99,
        "year": 2023,
        "number": 57576,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 100,
        "year": 2024,
        "number": 56832,
        "cityId": 10,
        "cityName": "Chelm"
    },
    {
        "id": 101,
        "year": 2015,
        "number": 341368,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 102,
        "year": 2016,
        "number": 340745,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 103,
        "year": 2017,
        "number": 340230,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 104,
        "year": 2018,
        "number": 339811,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 105,
        "year": 2019,
        "number": 339770,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 106,
        "year": 2020,
        "number": 336075,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 107,
        "year": 2021,
        "number": 334301,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 108,
        "year": 2022,
        "number": 331991,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 109,
        "year": 2023,
        "number": 330447,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 110,
        "year": 2024,
        "number": 328868,
        "cityId": 11,
        "cityName": "Lublin"
    },
    {
        "id": 111,
        "year": 2015,
        "number": 64969,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 112,
        "year": 2016,
        "number": 64746,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 113,
        "year": 2017,
        "number": 64485,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 114,
        "year": 2018,
        "number": 64099,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 115,
        "year": 2019,
        "number": 63511,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 116,
        "year": 2020,
        "number": 60813,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 117,
        "year": 2021,
        "number": 59950,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 118,
        "year": 2022,
        "number": 59274,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 119,
        "year": 2023,
        "number": 58685,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 120,
        "year": 2024,
        "number": 57924,
        "cityId": 12,
        "cityName": "Zamosc"
    },
    {
        "id": 121,
        "year": 2015,
        "number": 124116,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 122,
        "year": 2016,
        "number": 123911,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 123,
        "year": 2017,
        "number": 123963,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 124,
        "year": 2018,
        "number": 124177,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 125,
        "year": 2019,
        "number": 123691,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 126,
        "year": 2020,
        "number": 121278,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 127,
        "year": 2021,
        "number": 119638,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 128,
        "year": 2022,
        "number": 117379,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 129,
        "year": 2023,
        "number": 115847,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 130,
        "year": 2024,
        "number": 114567,
        "cityId": 13,
        "cityName": "Gorzow"
    },
    {
        "id": 131,
        "year": 2015,
        "number": 138763,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 132,
        "year": 2016,
        "number": 138898,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 133,
        "year": 2017,
        "number": 139560,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 134,
        "year": 2018,
        "number": 140113,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 135,
        "year": 2019,
        "number": 140874,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 136,
        "year": 2020,
        "number": 140536,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 137,
        "year": 2021,
        "number": 139972,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 138,
        "year": 2022,
        "number": 139503,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 139,
        "year": 2023,
        "number": 139132,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 140,
        "year": 2024,
        "number": 138887,
        "cityId": 14,
        "cityName": "Zielona"
    },
    {
        "id": 141,
        "year": 2015,
        "number": 703186,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 142,
        "year": 2016,
        "number": 698688,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 143,
        "year": 2017,
        "number": 693797,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 144,
        "year": 2018,
        "number": 687702,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 145,
        "year": 2019,
        "number": 682679,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 146,
        "year": 2020,
        "number": 678104,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 147,
        "year": 2021,
        "number": 668712,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 148,
        "year": 2022,
        "number": 661329,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 149,
        "year": 2023,
        "number": 655279,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 150,
        "year": 2024,
        "number": 648711,
        "cityId": 15,
        "cityName": "Lodz"
    },
    {
        "id": 151,
        "year": 2015,
        "number": 75363,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 152,
        "year": 2016,
        "number": 74905,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 153,
        "year": 2017,
        "number": 74469,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 154,
        "year": 2018,
        "number": 74004,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 155,
        "year": 2019,
        "number": 73370,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 156,
        "year": 2020,
        "number": 69809,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 157,
        "year": 2021,
        "number": 68673,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 158,
        "year": 2022,
        "number": 67734,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 159,
        "year": 2023,
        "number": 66901,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 160,
        "year": 2024,
        "number": 66211,
        "cityId": 16,
        "cityName": "Piotrkow"
    },
    {
        "id": 161,
        "year": 2015,
        "number": 48562,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 162,
        "year": 2016,
        "number": 48304,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 163,
        "year": 2017,
        "number": 48297,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 164,
        "year": 2018,
        "number": 48296,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 165,
        "year": 2019,
        "number": 48106,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 166,
        "year": 2020,
        "number": 46825,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 167,
        "year": 2021,
        "number": 46395,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 168,
        "year": 2022,
        "number": 45773,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 169,
        "year": 2023,
        "number": 45403,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 170,
        "year": 2024,
        "number": 44976,
        "cityId": 17,
        "cityName": "Skierniewice"
    },
    {
        "id": 171,
        "year": 2015,
        "number": 762508,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 172,
        "year": 2016,
        "number": 762448,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 173,
        "year": 2017,
        "number": 766739,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 174,
        "year": 2018,
        "number": 769498,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 175,
        "year": 2019,
        "number": 774839,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 176,
        "year": 2020,
        "number": 801546,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 177,
        "year": 2021,
        "number": 801242,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 178,
        "year": 2022,
        "number": 802781,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 179,
        "year": 2023,
        "number": 804237,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 180,
        "year": 2024,
        "number": 807644,
        "cityId": 18,
        "cityName": "Krakow"
    },
    {
        "id": 181,
        "year": 2015,
        "number": 83820,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 182,
        "year": 2016,
        "number": 83829,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 183,
        "year": 2017,
        "number": 83947,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 184,
        "year": 2018,
        "number": 83958,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 185,
        "year": 2019,
        "number": 83813,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 186,
        "year": 2020,
        "number": 81639,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 187,
        "year": 2021,
        "number": 81137,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 188,
        "year": 2022,
        "number": 80756,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 189,
        "year": 2023,
        "number": 80446,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 190,
        "year": 2024,
        "number": 79985,
        "cityId": 19,
        "cityName": "Nowy"
    },
    {
        "id": 191,
        "year": 2015,
        "number": 110956,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 192,
        "year": 2016,
        "number": 110381,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 193,
        "year": 2017,
        "number": 109842,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 194,
        "year": 2018,
        "number": 109358,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 195,
        "year": 2019,
        "number": 108580,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 196,
        "year": 2020,
        "number": 107275,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 197,
        "year": 2021,
        "number": 105840,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 198,
        "year": 2022,
        "number": 104454,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 199,
        "year": 2023,
        "number": 103515,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 200,
        "year": 2024,
        "number": 102582,
        "cityId": 20,
        "cityName": "Tarnow"
    },
    {
        "id": 201,
        "year": 2015,
        "number": 52554,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 202,
        "year": 2016,
        "number": 52408,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 203,
        "year": 2017,
        "number": 52308,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 204,
        "year": 2018,
        "number": 52461,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 205,
        "year": 2019,
        "number": 52071,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 206,
        "year": 2020,
        "number": 50150,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 207,
        "year": 2021,
        "number": 49643,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 208,
        "year": 2022,
        "number": 48995,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 209,
        "year": 2023,
        "number": 48471,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 210,
        "year": 2024,
        "number": 47922,
        "cityId": 21,
        "cityName": "Ostroleka"
    },
    {
        "id": 211,
        "year": 2015,
        "number": 121879,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 212,
        "year": 2016,
        "number": 121468,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 213,
        "year": 2017,
        "number": 121033,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 214,
        "year": 2018,
        "number": 120403,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 215,
        "year": 2019,
        "number": 119709,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 216,
        "year": 2020,
        "number": 115695,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 217,
        "year": 2021,
        "number": 114271,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 218,
        "year": 2022,
        "number": 113146,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 219,
        "year": 2023,
        "number": 111927,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 220,
        "year": 2024,
        "number": 110495,
        "cityId": 22,
        "cityName": "Plock"
    },
    {
        "id": 221,
        "year": 2015,
        "number": 216606,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 222,
        "year": 2016,
        "number": 215653,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 223,
        "year": 2017,
        "number": 214368,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 224,
        "year": 2018,
        "number": 213910,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 225,
        "year": 2019,
        "number": 212230,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 226,
        "year": 2020,
        "number": 203495,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 227,
        "year": 2021,
        "number": 201049,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 228,
        "year": 2022,
        "number": 198754,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 229,
        "year": 2023,
        "number": 196918,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 230,
        "year": 2024,
        "number": 194916,
        "cityId": 23,
        "cityName": "Radom"
    },
    {
        "id": 231,
        "year": 2015,
        "number": 76686,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 232,
        "year": 2016,
        "number": 77072,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 233,
        "year": 2017,
        "number": 77180,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 234,
        "year": 2018,
        "number": 77732,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 235,
        "year": 2019,
        "number": 77990,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 236,
        "year": 2020,
        "number": 76916,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 237,
        "year": 2021,
        "number": 76296,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 238,
        "year": 2022,
        "number": 75820,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 239,
        "year": 2023,
        "number": 75502,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 240,
        "year": 2024,
        "number": 75072,
        "cityId": 24,
        "cityName": "Siedlce"
    },
    {
        "id": 241,
        "year": 2015,
        "number": 1739586,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 242,
        "year": 2016,
        "number": 1748916,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 243,
        "year": 2017,
        "number": 1758143,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 244,
        "year": 2018,
        "number": 1769529,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 245,
        "year": 2019,
        "number": 1783321,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 246,
        "year": 2020,
        "number": 1861187,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 247,
        "year": 2021,
        "number": 1860205,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 248,
        "year": 2022,
        "number": 1862345,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 249,
        "year": 2023,
        "number": 1861644,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 250,
        "year": 2024,
        "number": 1862402,
        "cityId": 25,
        "cityName": "st."
    },
    {
        "id": 251,
        "year": 2015,
        "number": 119465,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 252,
        "year": 2016,
        "number": 118938,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 253,
        "year": 2017,
        "number": 128142,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 254,
        "year": 2018,
        "number": 128224,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 255,
        "year": 2019,
        "number": 128208,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 256,
        "year": 2020,
        "number": 127713,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 257,
        "year": 2021,
        "number": 127259,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 258,
        "year": 2022,
        "number": 126623,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 259,
        "year": 2023,
        "number": 126300,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 260,
        "year": 2024,
        "number": 125812,
        "cityId": 26,
        "cityName": "Opole"
    },
    {
        "id": 261,
        "year": 2015,
        "number": 46787,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 262,
        "year": 2016,
        "number": 46695,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 263,
        "year": 2017,
        "number": 46478,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 264,
        "year": 2018,
        "number": 46532,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 265,
        "year": 2019,
        "number": 46369,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 266,
        "year": 2020,
        "number": 45360,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 267,
        "year": 2021,
        "number": 44939,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 268,
        "year": 2022,
        "number": 44530,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 269,
        "year": 2023,
        "number": 44198,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 270,
        "year": 2024,
        "number": 43809,
        "cityId": 27,
        "cityName": "Krosno"
    },
    {
        "id": 271,
        "year": 2015,
        "number": 63130,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 272,
        "year": 2016,
        "number": 62485,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 273,
        "year": 2017,
        "number": 61973,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 274,
        "year": 2018,
        "number": 61509,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 275,
        "year": 2019,
        "number": 60999,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 276,
        "year": 2020,
        "number": 59288,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 277,
        "year": 2021,
        "number": 58184,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 278,
        "year": 2022,
        "number": 57193,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 279,
        "year": 2023,
        "number": 56466,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 280,
        "year": 2024,
        "number": 55642,
        "cityId": 28,
        "cityName": "Przemysl"
    },
    {
        "id": 281,
        "year": 2015,
        "number": 185706,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 282,
        "year": 2016,
        "number": 187027,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 283,
        "year": 2017,
        "number": 189111,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 284,
        "year": 2018,
        "number": 190849,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 285,
        "year": 2019,
        "number": 194886,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 286,
        "year": 2020,
        "number": 194557,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 287,
        "year": 2021,
        "number": 196241,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 288,
        "year": 2022,
        "number": 196726,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 289,
        "year": 2023,
        "number": 197536,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 290,
        "year": 2024,
        "number": 197706,
        "cityId": 29,
        "cityName": "Rzeszow"
    },
    {
        "id": 291,
        "year": 2015,
        "number": 47902,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 292,
        "year": 2016,
        "number": 47658,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 293,
        "year": 2017,
        "number": 47527,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 294,
        "year": 2018,
        "number": 47226,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 295,
        "year": 2019,
        "number": 46907,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 296,
        "year": 2020,
        "number": 45282,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 297,
        "year": 2021,
        "number": 44759,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 298,
        "year": 2022,
        "number": 44314,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 299,
        "year": 2023,
        "number": 44012,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 300,
        "year": 2024,
        "number": 43472,
        "cityId": 30,
        "cityName": "Tarnobrzeg"
    },
    {
        "id": 301,
        "year": 2015,
        "number": 295624,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 302,
        "year": 2016,
        "number": 296310,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 303,
        "year": 2017,
        "number": 297132,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 304,
        "year": 2018,
        "number": 297403,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 305,
        "year": 2019,
        "number": 297356,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 306,
        "year": 2020,
        "number": 295302,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 307,
        "year": 2021,
        "number": 294131,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 308,
        "year": 2022,
        "number": 293028,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 309,
        "year": 2023,
        "number": 292058,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 310,
        "year": 2024,
        "number": 290907,
        "cityId": 31,
        "cityName": "Bialystok"
    },
    {
        "id": 311,
        "year": 2015,
        "number": 62746,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 312,
        "year": 2016,
        "number": 62716,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 313,
        "year": 2017,
        "number": 62843,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 314,
        "year": 2018,
        "number": 63089,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 315,
        "year": 2019,
        "number": 62965,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 316,
        "year": 2020,
        "number": 61247,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 317,
        "year": 2021,
        "number": 60727,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 318,
        "year": 2022,
        "number": 60264,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 319,
        "year": 2023,
        "number": 59965,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 320,
        "year": 2024,
        "number": 59476,
        "cityId": 32,
        "cityName": "Lomza"
    },
    {
        "id": 321,
        "year": 2015,
        "number": 69351,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 322,
        "year": 2016,
        "number": 69543,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 323,
        "year": 2017,
        "number": 69660,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 324,
        "year": 2018,
        "number": 69693,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 325,
        "year": 2019,
        "number": 69858,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 326,
        "year": 2020,
        "number": 69420,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 327,
        "year": 2021,
        "number": 69208,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 328,
        "year": 2022,
        "number": 68752,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 329,
        "year": 2023,
        "number": 68434,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 330,
        "year": 2024,
        "number": 68035,
        "cityId": 33,
        "cityName": "Suwalki"
    },
    {
        "id": 331,
        "year": 2015,
        "number": 461798,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 332,
        "year": 2016,
        "number": 462996,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 333,
        "year": 2017,
        "number": 464293,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 334,
        "year": 2018,
        "number": 464829,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 335,
        "year": 2019,
        "number": 468158,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 336,
        "year": 2020,
        "number": 487262,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 337,
        "year": 2021,
        "number": 486283,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 338,
        "year": 2022,
        "number": 486226,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 339,
        "year": 2023,
        "number": 486492,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 340,
        "year": 2024,
        "number": 487834,
        "cityId": 34,
        "cityName": "Gdansk"
    },
    {
        "id": 341,
        "year": 2015,
        "number": 247672,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 342,
        "year": 2016,
        "number": 247329,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 343,
        "year": 2017,
        "number": 246643,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 344,
        "year": 2018,
        "number": 246204,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 345,
        "year": 2019,
        "number": 246244,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 346,
        "year": 2020,
        "number": 246637,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 347,
        "year": 2021,
        "number": 244862,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 348,
        "year": 2022,
        "number": 243770,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 349,
        "year": 2023,
        "number": 242141,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 350,
        "year": 2024,
        "number": 240554,
        "cityId": 35,
        "cityName": "Gdynia"
    },
    {
        "id": 351,
        "year": 2015,
        "number": 92869,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 352,
        "year": 2016,
        "number": 92170,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 353,
        "year": 2017,
        "number": 91715,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 354,
        "year": 2018,
        "number": 91225,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 355,
        "year": 2019,
        "number": 90769,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 356,
        "year": 2020,
        "number": 88600,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 357,
        "year": 2021,
        "number": 87464,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 358,
        "year": 2022,
        "number": 86737,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 359,
        "year": 2023,
        "number": 86027,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 360,
        "year": 2024,
        "number": 85135,
        "cityId": 36,
        "cityName": "Slupsk"
    },
    {
        "id": 361,
        "year": 2015,
        "number": 37457,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 362,
        "year": 2016,
        "number": 37089,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 363,
        "year": 2017,
        "number": 36701,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 364,
        "year": 2018,
        "number": 36328,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 365,
        "year": 2019,
        "number": 35827,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 366,
        "year": 2020,
        "number": 33401,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 367,
        "year": 2021,
        "number": 32883,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 368,
        "year": 2022,
        "number": 32474,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 369,
        "year": 2023,
        "number": 32115,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 370,
        "year": 2024,
        "number": 31696,
        "cityId": 37,
        "cityName": "Sopot"
    },
    {
        "id": 371,
        "year": 2015,
        "number": 172781,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 372,
        "year": 2016,
        "number": 172407,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 373,
        "year": 2017,
        "number": 171828,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 374,
        "year": 2018,
        "number": 171277,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 375,
        "year": 2019,
        "number": 170953,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 376,
        "year": 2020,
        "number": 170100,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 377,
        "year": 2021,
        "number": 168622,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 378,
        "year": 2022,
        "number": 167509,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 379,
        "year": 2023,
        "number": 166189,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 380,
        "year": 2024,
        "number": 165127,
        "cityId": 38,
        "cityName": "Bielsko-Biala"
    },
    {
        "id": 381,
        "year": 2015,
        "number": 171515,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 382,
        "year": 2016,
        "number": 170059,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 383,
        "year": 2017,
        "number": 168968,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 384,
        "year": 2018,
        "number": 167672,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 385,
        "year": 2019,
        "number": 165975,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 386,
        "year": 2020,
        "number": 155019,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 387,
        "year": 2021,
        "number": 152802,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 388,
        "year": 2022,
        "number": 150594,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 389,
        "year": 2023,
        "number": 148687,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 390,
        "year": 2024,
        "number": 146922,
        "cityId": 39,
        "cityName": "Bytom"
    },
    {
        "id": 391,
        "year": 2015,
        "number": 110125,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 392,
        "year": 2016,
        "number": 109541,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 393,
        "year": 2017,
        "number": 109151,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 394,
        "year": 2018,
        "number": 108668,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 395,
        "year": 2019,
        "number": 107963,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 396,
        "year": 2020,
        "number": 105045,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 397,
        "year": 2021,
        "number": 103873,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 398,
        "year": 2022,
        "number": 102564,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 399,
        "year": 2023,
        "number": 101184,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 400,
        "year": 2024,
        "number": 100012,
        "cityId": 40,
        "cityName": "Chorzow"
    },
    {
        "id": 401,
        "year": 2015,
        "number": 229086,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 402,
        "year": 2016,
        "number": 227270,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 403,
        "year": 2017,
        "number": 225313,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 404,
        "year": 2018,
        "number": 223322,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 405,
        "year": 2019,
        "number": 221252,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 406,
        "year": 2020,
        "number": 215690,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 407,
        "year": 2021,
        "number": 212336,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 408,
        "year": 2022,
        "number": 209395,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 409,
        "year": 2023,
        "number": 207117,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 410,
        "year": 2024,
        "number": 204730,
        "cityId": 41,
        "cityName": "Czestochowa"
    },
    {
        "id": 411,
        "year": 2015,
        "number": 122923,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 412,
        "year": 2016,
        "number": 122451,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 413,
        "year": 2017,
        "number": 121387,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 414,
        "year": 2018,
        "number": 120777,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 415,
        "year": 2019,
        "number": 119800,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 416,
        "year": 2020,
        "number": 117871,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 417,
        "year": 2021,
        "number": 116500,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 418,
        "year": 2022,
        "number": 115317,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 419,
        "year": 2023,
        "number": 114148,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 420,
        "year": 2024,
        "number": 112876,
        "cityId": 42,
        "cityName": "Dabrowa"
    },
    {
        "id": 421,
        "year": 2015,
        "number": 183970,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 422,
        "year": 2016,
        "number": 182969,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 423,
        "year": 2017,
        "number": 181715,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 424,
        "year": 2018,
        "number": 180708,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 425,
        "year": 2019,
        "number": 179154,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 426,
        "year": 2020,
        "number": 175718,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 427,
        "year": 2021,
        "number": 173535,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 428,
        "year": 2022,
        "number": 171896,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 429,
        "year": 2023,
        "number": 170457,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 430,
        "year": 2024,
        "number": 169259,
        "cityId": 43,
        "cityName": "Gliwice"
    },
    {
        "id": 431,
        "year": 2015,
        "number": 90549,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 432,
        "year": 2016,
        "number": 90089,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 433,
        "year": 2017,
        "number": 89707,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 434,
        "year": 2018,
        "number": 89353,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 435,
        "year": 2019,
        "number": 88808,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 436,
        "year": 2020,
        "number": 85775,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 437,
        "year": 2021,
        "number": 84677,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 438,
        "year": 2022,
        "number": 83477,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 439,
        "year": 2023,
        "number": 82788,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 440,
        "year": 2024,
        "number": 81809,
        "cityId": 44,
        "cityName": "Jastrzebie-Zdroj"
    },
    {
        "id": 441,
        "year": 2015,
        "number": 93076,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 442,
        "year": 2016,
        "number": 92618,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 443,
        "year": 2017,
        "number": 92215,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 444,
        "year": 2018,
        "number": 91758,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 445,
        "year": 2019,
        "number": 91263,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 446,
        "year": 2020,
        "number": 89660,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 447,
        "year": 2021,
        "number": 88744,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 448,
        "year": 2022,
        "number": 87842,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 449,
        "year": 2023,
        "number": 87166,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 450,
        "year": 2024,
        "number": 86421,
        "cityId": 45,
        "cityName": "Jaworzno"
    },
    {
        "id": 451,
        "year": 2015,
        "number": 300797,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 452,
        "year": 2016,
        "number": 299012,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 453,
        "year": 2017,
        "number": 297197,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 454,
        "year": 2018,
        "number": 295449,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 455,
        "year": 2019,
        "number": 293636,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 456,
        "year": 2020,
        "number": 287590,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 457,
        "year": 2021,
        "number": 284957,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 458,
        "year": 2022,
        "number": 281418,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 459,
        "year": 2023,
        "number": 279119,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 460,
        "year": 2024,
        "number": 278090,
        "cityId": 46,
        "cityName": "Katowice"
    },
    {
        "id": 461,
        "year": 2015,
        "number": 75019,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 462,
        "year": 2016,
        "number": 74711,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 463,
        "year": 2017,
        "number": 74600,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 464,
        "year": 2018,
        "number": 74578,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 465,
        "year": 2019,
        "number": 74515,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 466,
        "year": 2020,
        "number": 72629,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 467,
        "year": 2021,
        "number": 72452,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 468,
        "year": 2022,
        "number": 71849,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 469,
        "year": 2023,
        "number": 71473,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 470,
        "year": 2024,
        "number": 71062,
        "cityId": 47,
        "cityName": "Myslowice"
    },
    {
        "id": 471,
        "year": 2015,
        "number": 56588,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 472,
        "year": 2016,
        "number": 56126,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 473,
        "year": 2017,
        "number": 55820,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 474,
        "year": 2018,
        "number": 55450,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 475,
        "year": 2019,
        "number": 55088,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 476,
        "year": 2020,
        "number": 53326,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 477,
        "year": 2021,
        "number": 52941,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 478,
        "year": 2022,
        "number": 52396,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 479,
        "year": 2023,
        "number": 51876,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 480,
        "year": 2024,
        "number": 51565,
        "cityId": 48,
        "cityName": "Piekary"
    },
    {
        "id": 481,
        "year": 2015,
        "number": 140212,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 482,
        "year": 2016,
        "number": 139412,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 483,
        "year": 2017,
        "number": 138754,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 484,
        "year": 2018,
        "number": 138215,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 485,
        "year": 2019,
        "number": 137624,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 486,
        "year": 2020,
        "number": 134776,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 487,
        "year": 2021,
        "number": 133453,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 488,
        "year": 2022,
        "number": 132040,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 489,
        "year": 2023,
        "number": 131062,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 490,
        "year": 2024,
        "number": 129531,
        "cityId": 49,
        "cityName": "Ruda"
    },
    {
        "id": 491,
        "year": 2015,
        "number": 139866,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 492,
        "year": 2016,
        "number": 139540,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 493,
        "year": 2017,
        "number": 139076,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 494,
        "year": 2018,
        "number": 138919,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 495,
        "year": 2019,
        "number": 138319,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 496,
        "year": 2020,
        "number": 134704,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 497,
        "year": 2021,
        "number": 133393,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 498,
        "year": 2022,
        "number": 132266,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 499,
        "year": 2023,
        "number": 131323,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 500,
        "year": 2024,
        "number": 130373,
        "cityId": 50,
        "cityName": "Rybnik"
    },
    {
        "id": 501,
        "year": 2015,
        "number": 68411,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 502,
        "year": 2016,
        "number": 68011,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 503,
        "year": 2017,
        "number": 67710,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 504,
        "year": 2018,
        "number": 67330,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 505,
        "year": 2019,
        "number": 66963,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 506,
        "year": 2020,
        "number": 65252,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 507,
        "year": 2021,
        "number": 64526,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 508,
        "year": 2022,
        "number": 64139,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 509,
        "year": 2023,
        "number": 63657,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 510,
        "year": 2024,
        "number": 63185,
        "cityId": 51,
        "cityName": "Siemianowice"
    },
    {
        "id": 511,
        "year": 2015,
        "number": 208321,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 512,
        "year": 2016,
        "number": 206516,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 513,
        "year": 2017,
        "number": 204958,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 514,
        "year": 2018,
        "number": 203094,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 515,
        "year": 2019,
        "number": 201121,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 516,
        "year": 2020,
        "number": 195848,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 517,
        "year": 2021,
        "number": 192836,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 518,
        "year": 2022,
        "number": 190406,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 519,
        "year": 2023,
        "number": 188151,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 520,
        "year": 2024,
        "number": 185930,
        "cityId": 52,
        "cityName": "Sosnowiec"
    },
    {
        "id": 521,
        "year": 2015,
        "number": 51299,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 522,
        "year": 2016,
        "number": 50750,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 523,
        "year": 2017,
        "number": 50529,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 524,
        "year": 2018,
        "number": 50185,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 525,
        "year": 2019,
        "number": 49762,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 526,
        "year": 2020,
        "number": 46900,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 527,
        "year": 2021,
        "number": 46352,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 528,
        "year": 2022,
        "number": 45972,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 529,
        "year": 2023,
        "number": 45644,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 530,
        "year": 2024,
        "number": 45215,
        "cityId": 53,
        "cityName": "Swietochlowice"
    },
    {
        "id": 531,
        "year": 2015,
        "number": 128480,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 532,
        "year": 2016,
        "number": 128415,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 533,
        "year": 2017,
        "number": 128191,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 534,
        "year": 2018,
        "number": 128049,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 535,
        "year": 2019,
        "number": 127664,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 536,
        "year": 2020,
        "number": 125659,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 537,
        "year": 2021,
        "number": 124542,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 538,
        "year": 2022,
        "number": 123562,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 539,
        "year": 2023,
        "number": 122605,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 540,
        "year": 2024,
        "number": 121472,
        "cityId": 54,
        "cityName": "Tychy"
    },
    {
        "id": 541,
        "year": 2015,
        "number": 176825,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 542,
        "year": 2016,
        "number": 175882,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 543,
        "year": 2017,
        "number": 175016,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 544,
        "year": 2018,
        "number": 173784,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 545,
        "year": 2019,
        "number": 172806,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 546,
        "year": 2020,
        "number": 159690,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 547,
        "year": 2021,
        "number": 157820,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 548,
        "year": 2022,
        "number": 156082,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 549,
        "year": 2023,
        "number": 154642,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 550,
        "year": 2024,
        "number": 153067,
        "cityId": 55,
        "cityName": "Zabrze"
    },
    {
        "id": 551,
        "year": 2015,
        "number": 61985,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 552,
        "year": 2016,
        "number": 61942,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 553,
        "year": 2017,
        "number": 62103,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 554,
        "year": 2018,
        "number": 62309,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 555,
        "year": 2019,
        "number": 62462,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 556,
        "year": 2020,
        "number": 61659,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 557,
        "year": 2021,
        "number": 61806,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 558,
        "year": 2022,
        "number": 61835,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 559,
        "year": 2023,
        "number": 61793,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 560,
        "year": 2024,
        "number": 61814,
        "cityId": 56,
        "cityName": "Zory"
    },
    {
        "id": 561,
        "year": 2015,
        "number": 198475,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 562,
        "year": 2016,
        "number": 197724,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 563,
        "year": 2017,
        "number": 197336,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 564,
        "year": 2018,
        "number": 196335,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 565,
        "year": 2019,
        "number": 195266,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 566,
        "year": 2020,
        "number": 188230,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 567,
        "year": 2021,
        "number": 186498,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 568,
        "year": 2022,
        "number": 184520,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 569,
        "year": 2023,
        "number": 183147,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 570,
        "year": 2024,
        "number": 181211,
        "cityId": 57,
        "cityName": "Kielce"
    },
    {
        "id": 571,
        "year": 2015,
        "number": 121994,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 572,
        "year": 2016,
        "number": 121412,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 573,
        "year": 2017,
        "number": 121046,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 574,
        "year": 2018,
        "number": 120568,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 575,
        "year": 2019,
        "number": 119760,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 576,
        "year": 2020,
        "number": 116090,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 577,
        "year": 2021,
        "number": 114963,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 578,
        "year": 2022,
        "number": 113912,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 579,
        "year": 2023,
        "number": 113195,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 580,
        "year": 2024,
        "number": 112445,
        "cityId": 58,
        "cityName": "Elblag"
    },
    {
        "id": 581,
        "year": 2015,
        "number": 174083,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 582,
        "year": 2016,
        "number": 173599,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 583,
        "year": 2017,
        "number": 172970,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 584,
        "year": 2018,
        "number": 173125,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 585,
        "year": 2019,
        "number": 172194,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 586,
        "year": 2020,
        "number": 171310,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 587,
        "year": 2021,
        "number": 170080,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 588,
        "year": 2022,
        "number": 168803,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 589,
        "year": 2023,
        "number": 167844,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 590,
        "year": 2024,
        "number": 166697,
        "cityId": 59,
        "cityName": "Olsztyn"
    },
    {
        "id": 591,
        "year": 2015,
        "number": 103090,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 592,
        "year": 2016,
        "number": 102575,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 593,
        "year": 2017,
        "number": 101902,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 594,
        "year": 2018,
        "number": 101279,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 595,
        "year": 2019,
        "number": 100482,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 596,
        "year": 2020,
        "number": 96877,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 597,
        "year": 2021,
        "number": 95563,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 598,
        "year": 2022,
        "number": 94489,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 599,
        "year": 2023,
        "number": 93681,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 600,
        "year": 2024,
        "number": 92533,
        "cityId": 60,
        "cityName": "Kalisz"
    },
    {
        "id": 601,
        "year": 2015,
        "number": 76192,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 602,
        "year": 2016,
        "number": 75607,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 603,
        "year": 2017,
        "number": 75077,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 604,
        "year": 2018,
        "number": 74472,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 605,
        "year": 2019,
        "number": 73742,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 606,
        "year": 2020,
        "number": 70799,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 607,
        "year": 2021,
        "number": 69577,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 608,
        "year": 2022,
        "number": 68483,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 609,
        "year": 2023,
        "number": 67596,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 610,
        "year": 2024,
        "number": 66606,
        "cityId": 61,
        "cityName": "Konin"
    },
    {
        "id": 611,
        "year": 2015,
        "number": 64639,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 612,
        "year": 2016,
        "number": 64468,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 613,
        "year": 2017,
        "number": 64090,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 614,
        "year": 2018,
        "number": 64023,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 615,
        "year": 2019,
        "number": 63774,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 616,
        "year": 2020,
        "number": 62526,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 617,
        "year": 2021,
        "number": 61625,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 618,
        "year": 2022,
        "number": 60983,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 619,
        "year": 2023,
        "number": 60313,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 620,
        "year": 2024,
        "number": 59840,
        "cityId": 62,
        "cityName": "Leszno"
    },
    {
        "id": 621,
        "year": 2015,
        "number": 544612,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 622,
        "year": 2016,
        "number": 541561,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 623,
        "year": 2017,
        "number": 539549,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 624,
        "year": 2018,
        "number": 537643,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 625,
        "year": 2019,
        "number": 535802,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 626,
        "year": 2020,
        "number": 549559,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 627,
        "year": 2021,
        "number": 546127,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 628,
        "year": 2022,
        "number": 543347,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 629,
        "year": 2023,
        "number": 540146,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 630,
        "year": 2024,
        "number": 536818,
        "cityId": 63,
        "cityName": "Poznan"
    },
    {
        "id": 631,
        "year": 2015,
        "number": 108576,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 632,
        "year": 2016,
        "number": 107981,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 633,
        "year": 2017,
        "number": 107758,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 634,
        "year": 2018,
        "number": 107692,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 635,
        "year": 2019,
        "number": 107225,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 636,
        "year": 2020,
        "number": 106797,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 637,
        "year": 2021,
        "number": 105698,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 638,
        "year": 2022,
        "number": 104648,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 639,
        "year": 2023,
        "number": 105905,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 640,
        "year": 2024,
        "number": 105143,
        "cityId": 64,
        "cityName": "Koszalin"
    },
    {
        "id": 641,
        "year": 2015,
        "number": 407043,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 642,
        "year": 2016,
        "number": 405413,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 643,
        "year": 2017,
        "number": 404403,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 644,
        "year": 2018,
        "number": 403274,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 645,
        "year": 2019,
        "number": 402067,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 646,
        "year": 2020,
        "number": 400024,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 647,
        "year": 2021,
        "number": 395441,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 648,
        "year": 2022,
        "number": 393028,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 649,
        "year": 2023,
        "number": 390278,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 650,
        "year": 2024,
        "number": 387700,
        "cityId": 65,
        "cityName": "Szczecin"
    },
    {
        "id": 651,
        "year": 2015,
        "number": 41217,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 652,
        "year": 2016,
        "number": 41134,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 653,
        "year": 2017,
        "number": 41027,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 654,
        "year": 2018,
        "number": 40967,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 655,
        "year": 2019,
        "number": 40883,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 656,
        "year": 2020,
        "number": 40242,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 657,
        "year": 2021,
        "number": 40063,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 658,
        "year": 2022,
        "number": 39631,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 659,
        "year": 2023,
        "number": 39189,
        "cityId": 66,
        "cityName": "Swinoujscie"
    },
    {
        "id": 660,
        "year": 2024,
        "number": 38728,
        "cityId": 66,
        "cityName": "Swinoujscie"
    }
]