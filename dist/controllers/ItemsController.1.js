"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const type_steamapi_1 = __importDefault(require("type-steamapi"));
const ItemsController_1 = require("./ItemsController");
class ItemsController {
    async index(req, res) {
        const items = await ItemsController_1.prisma.items.findMany({});
        const steam = new type_steamapi_1.default({
            apiKey: 'C7D1C363CD3EAB16DCBC654EBDAF3324',
        });
        const steamId = await steam.resolve('https://steamcommunity.com/id/dragon_boll71/');
        // const steamItemsPrice = require('steam-price-api');
        // https://steamcommunity.com/market/priceoverview/?currency=5&country=us&appid=730&market_hash_name=Chroma%203%20Case&format=json
        // https://api.steamapis.com/market/apps?api_key=C7D1C363CD3EAB16DCBC654EBDAF3324
        const OwnedGames = await steam.getUserOwnedGames(steamId);
        const RecentPlayed = await steam.getUserRecentPlayed(steamId);
        const Level = await steam.getUserLevel(steamId);
        // -------------------------------------
        // ПОЛУЧЕНИЕ ЦЕН И ЗАПИСЬ В БД
        // -------------------------------------
        const exchange_rate = await fetch('https://api.coingate.com/v2/rates/merchant/UAH/RUB');
        const UAH = await exchange_rate.json();
        console.log(items.length, OwnedGames === null || OwnedGames === void 0 ? void 0 : OwnedGames.length);
        let array = new Array();
        if ((OwnedGames === null || OwnedGames === void 0 ? void 0 : OwnedGames.length) != null) {
            if (items.length == OwnedGames.length) {
                res.view("/templates/index.ejs", {
                    OwnedGames: items,
                    RecentPlayed: RecentPlayed,
                    Level: Level
                });
            }
            else if (items.length == 0) {
                for (let i = 0; i < OwnedGames.length; i++) {
                    try {
                        let item = await fetch('https://store.steampowered.com/api/appdetails?appids=' + OwnedGames[i].appId + '&cc=ua&filters=price_overview');
                        let result = await item.json();
                        setTimeout(() => {
                            if (Object.values(result)[0].success == true) {
                                if (Object.values(result)[0].data.length != 0) {
                                    let cost = Math.ceil(Object.values(result)[0].data.price_overview.final / 100 * UAH) + ' руб.';
                                    let discount = Object.values(result)[0].data.price_overview.discount_percent;
                                    let item = OwnedGames[i];
                                    item['cost'] = cost;
                                    item['discount'] = discount;
                                    array.push(item);
                                }
                                else {
                                    let cost = "Бесплатно";
                                    let item = OwnedGames[i];
                                    item['cost'] = cost;
                                    array.push(item);
                                }
                                ;
                            }
                            else {
                                let cost = "Больше не доступно в Steam";
                                let item = OwnedGames[i];
                                item['cost'] = cost;
                                array.push(item);
                            }
                        }, 1000 * 1.5);
                    }
                    catch (error) {
                        let errorMessage = "Failed to do something exceptional";
                        if (error instanceof Error) {
                            errorMessage = error.message;
                        }
                        console.log(errorMessage);
                    }
                }
                for (let i = 0; i < array.length; i++) {
                    console.log(array[i]);
                }
                for (let i = 0; i < array.length; i++) {
                    await ItemsController_1.prisma.items.create({
                        data: {
                            appId: array[i].appId,
                            title: array[i].name,
                            image: array[i].imgIconUrl,
                            time: array[i].playtimeTotal,
                            cost: array[i].cost,
                        }
                    });
                }
                res.view("/templates/index.ejs", {
                    OwnedGames: items,
                    RecentPlayed: RecentPlayed,
                    Level: Level
                });
            }
            else {
                for (let i = 0; i < OwnedGames.length; i++) {
                    for (let j = 0; j < items.length; j++) {
                        let item = await ItemsController_1.prisma.items.findMany({
                            where: {
                                appId: Number(OwnedGames[i].appId)
                            }
                        });
                        if (item.length == 0) {
                        }
                    }
                }
                res.view("/templates/index.ejs", {
                    OwnedGames: items,
                    RecentPlayed: RecentPlayed,
                    Level: Level
                });
            }
        }
        // async item(req: any, res: any) {
        //     const item = await prisma.items.findMany({
        //         where: {
        //         }
        //     });
        // }
        // try {
        //     if (OwnedGames?.length != null) {
        //         for (let i = 0; i < OwnedGames.length; i++) {
        //             let item = await fetch('https://store.steampowered.com/api/appdetails?appids=' + OwnedGames[i].appId + '&cc=ua&filters=price_overview');
        //             let result = await item.json();
        //             setTimeout(() => {
        //                 if (Object.values(result)[0].success == true) {
        //                     if (Object.values(result)[0].data.length != 0) {
        //                         let cost = Math.ceil(Object.values(result)[0].data.price_overview.final / 100 * UAH) + ' руб.';
        //                         let discount = Object.values(result)[0].data.price_overview.discount_percent;
        //                         let item = OwnedGames[i];
        //                         item['cost'] = cost;
        //                         item['discount'] = discount;
        //                     } else {
        //                         let cost = "Бесплатно";
        //                         let item = OwnedGames[i];
        //                         item['cost'] = cost;
        //                     };
        //                 } else {
        //                     let cost = "Больше не доступно в Steam";
        //                     let item = OwnedGames[i];
        //                     item['cost'] = cost;
        //                 }
        //             }, 1000 * 1.5);
        //         }
        //     }
        // } catch (error) {
        //     let errorMessage = "Failed to do something exceptional";
        //     if (error instanceof Error) {
        //         errorMessage = error.message;
        //     }
        //     console.log(errorMessage);
        // }
        // // -------------------------------------
        // // ЗАПИСЬ В БД
        // // -------------------------------------
        // if (OwnedGames?.length != undefined) {
        //     if (items.length == 0 || items.length == undefined) {
        //         for (let i = 0; i < OwnedGames.length; i++) {
        //             await prisma.items.create({
        //                 data: {
        //                     title: OwnedGames[i].name,
        //                     appId: Number(OwnedGames[i].appId),
        //                     image: OwnedGames[i].imgIconUrl,
        //                     time: Number(OwnedGames[i].playtimeTotal),
        //                     cost: OwnedGames[i].cost
        //                 }
        //             });
        //         }
        //     } else {
        //         for (let i = 0; i < OwnedGames.length; i++) {
        //             let name = OwnedGames[i].name;
        //             let item = await prisma.items.findMany({
        //                 where: {
        //                     title: name
        //                 }
        //             });
        //             if (item == undefined || item == null) {
        //                 await prisma.items.create({
        //                     data: {
        //                         title: OwnedGames[i].name,
        //                         appId: Number(OwnedGames[i].appId),
        //                         image: OwnedGames[i].imgIconUrl,
        //                         time: Number(OwnedGames[i].playtimeTotal)
        //                         cost: OwnedGames[i].cost
        //                     }
        //                 });
        //             }
        //         }
        //     }
        // }
        // -------------------------------------
        //ПОЛУЧЕНИЕ ДЕТАЛЬНОЙ ИНФОРМАЦИИ ОБ ИГРЕ
        // -------------------------------------
        // let categoriesOnView = [];
        // if(OwnedGames != null) for(let i = 0; i < OwnedGames.length; i++){
        //     let fullInformation = await steam.getAppDetails(OwnedGames[i].appId)
        //     fullInformation?.name;
        //     fullInformation?.controllerSupport;
        //     fullInformation?.detailedDescription;
        //     fullInformation?.aboutTheGame;
        //     fullInformation?.supportedLanguages;
        //     fullInformation?.pcRequirements.minimum;
        //     // fullInformation?.pcRequirements.recommended;
        //     fullInformation?.developers;
        //     fullInformation?.publishers;
        //     fullInformation?.platforms;
        //     fullInformation?.metacritic;
        // let categories = fullInformation?.categories
        // }
        // const a = await steam.getAppDetails('550');
        // console.log(a)                                                       
        // steamItemsPrice.getprices(730, userOwnedGames, '1').then(data => {
        //     console.log(data);                                               НАХОДИТ ЦЕНЫ ВНУТРИИГРОВЫХ ПРЕДМЕТОВ
        // }).catch(err => console.log(err)); 
    }
}
exports.ItemsController = ItemsController;
