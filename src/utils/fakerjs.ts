import { Chance } from 'chance';
import { faker } from '@faker-js/faker';

import { IMockOptions } from './mock';

export const FAKERJS_MOCK_OPTIONS: IMockOptions[] = [

    // Commerce
    { key: 'fakerjs.commerce.department', name: 'Commerce - Department', lib: 'fakerjs', fn: () => faker.commerce.department() },
    { key: 'fakerjs.commerce.isbn', name: 'Commerce - ISBN', lib: 'fakerjs', fn: () => faker.commerce.isbn() }, // Faker doesn't have ISBN directly, so UUID can be used as a proxy.
    { key: 'fakerjs.commerce.price', name: 'Commerce - Price', lib: 'fakerjs', fn: () => faker.commerce.price() },
    { key: 'fakerjs.commerce.product', name: 'Commerce - Product', lib: 'fakerjs', fn: () => faker.commerce.product() },
    { key: 'fakerjs.commerce.productAdjective', name: 'Commerce - Product Adjective', lib: 'fakerjs', fn: () => faker.commerce.productAdjective() },
    { key: 'fakerjs.commerce.productDescription', name: 'Commerce - Product Description', lib: 'fakerjs', fn: () => faker.commerce.productDescription() },
    { key: 'fakerjs.commerce.productMaterial', name: 'Commerce - Product Material', lib: 'fakerjs', fn: () => faker.commerce.productMaterial() },
    { key: 'fakerjs.commerce.productName', name: 'Commerce - Product Name', lib: 'fakerjs', fn: () => faker.commerce.productName() },


    // Music
    { key: 'fakerjs.music.album', name: 'Music - Album', lib: 'fakerjs', fn: () => faker.music.album() },
    { key: 'fakerjs.music.artist', name: 'Music - Artist', lib: 'fakerjs', fn: () => faker.music.artist() },
    { key: 'fakerjs.music.genre', name: 'Music - Genre', lib: 'fakerjs', fn: () => faker.music.genre() },
    { key: 'fakerjs.music.songName', name: 'Music - Song Name', lib: 'fakerjs', fn: () => faker.music.songName() },

    // Git
    { key: 'fakerjs.git.branch', name: 'Git - Branch', lib: 'fakerjs', fn: () => faker.git.branch() },
    { key: 'fakerjs.git.commitDate', name: 'Git - Commit Date', lib: 'fakerjs', fn: () => faker.git.commitDate() },
    { key: 'fakerjs.git.commitEntry', name: 'Git - Commit Entry', lib: 'fakerjs', fn: () => faker.git.commitEntry() },
    { key: 'fakerjs.git.commitMessage', name: 'Git - Commit Message', lib: 'fakerjs', fn: () => faker.git.commitMessage() },
    { key: 'fakerjs.git.commitSha', name: 'Git - Commit SHA', lib: 'fakerjs', fn: () => faker.git.commitSha() },

    // Book
    { key: 'fakerjs.book.author', name: 'Book - Author', lib: 'fakerjs', fn: () => faker.book.author() },
    { key: 'fakerjs.book.genre', name: 'Book - Genre', lib: 'fakerjs', fn: () => faker.book.genre() },
    { key: 'fakerjs.book.publisher', name: 'Book - Publisher', lib: 'fakerjs', fn: () => faker.book.publisher() },
    { key: 'fakerjs.book.title', name: 'Book - Title', lib: 'fakerjs', fn: () => faker.book.title() },
    { key: 'fakerjs.book.series', name: 'Book - Series', lib: 'fakerjs', fn: () => faker.book.series() },
    { key: 'fakerjs.book.format', name: 'Book - Format', lib: 'fakerjs', fn: () => faker.book.format() },

    // Hacker
    { key: 'fakerjs.hacker.abbreviation', name: 'Hacker - Abbreviation', lib: 'fakerjs', fn: () => faker.hacker.abbreviation() },
    { key: 'fakerjs.hacker.adjective', name: 'Hacker - Adjective', lib: 'fakerjs', fn: () => faker.hacker.adjective() },
    { key: 'fakerjs.hacker.noun', name: 'Hacker - Noun', lib: 'fakerjs', fn: () => faker.hacker.noun() },
    { key: 'fakerjs.hacker.verb', name: 'Hacker - Verb', lib: 'fakerjs', fn: () => faker.hacker.verb() },
    { key: 'fakerjs.hacker.ingverb', name: 'Hacker - Ing Verb', lib: 'fakerjs', fn: () => faker.hacker.ingverb() },
    { key: 'fakerjs.hacker.phrase', name: 'Hacker - Phrase', lib: 'fakerjs', fn: () => faker.hacker.phrase() },

    // Color
    { key: 'fakerjs.color.cmyk', name: 'Color - CMYK', lib: 'fakerjs', fn: () => faker.color.cmyk() },
    { key: 'fakerjs.color.colorByCSSColorSpace', name: 'Color - Color By CSS Color Space', lib: 'fakerjs', fn: () => faker.color.colorByCSSColorSpace() },
    { key: 'fakerjs.color.cssSupportedFunction', name: 'Color - CSS Supported Function', lib: 'fakerjs', fn: () => faker.color.cssSupportedFunction() },
    { key: 'fakerjs.color.cssSupportedSpace', name: 'Color - CSS Supported Space', lib: 'fakerjs', fn: () => faker.color.cssSupportedSpace() },
    { key: 'fakerjs.color.hsl', name: 'Color - HSL', lib: 'fakerjs', fn: () => faker.color.hsl() },
    { key: 'fakerjs.color.human', name: 'Color - Human', lib: 'fakerjs', fn: () => faker.color.human() },
    { key: 'fakerjs.color.hwb', name: 'Color - HWB', lib: 'fakerjs', fn: () => faker.color.hwb() },
    { key: 'fakerjs.color.lab', name: 'Color - LAB', lib: 'fakerjs', fn: () => faker.color.lab() },
    { key: 'fakerjs.color.lch', name: 'Color - LCH', lib: 'fakerjs', fn: () => faker.color.lch() },
    { key: 'fakerjs.color.rgb', name: 'Color - RGB', lib: 'fakerjs', fn: () => faker.color.rgb() },
    { key: 'fakerjs.color.space', name: 'Color - Space', lib: 'fakerjs', fn: () => faker.color.space() },

    // Vehicle
    { key: 'fakerjs.vehicle.bicycle', name: 'Vehicle - Bicycle', lib: 'fakerjs', fn: () => faker.vehicle.bicycle() },
    { key: 'fakerjs.vehicle.color', name: 'Vehicle - Color', lib: 'fakerjs', fn: () => faker.vehicle.color() },
    { key: 'fakerjs.vehicle.fuel', name: 'Vehicle - Fuel', lib: 'fakerjs', fn: () => faker.vehicle.fuel() },
    { key: 'fakerjs.vehicle.manufacturer', name: 'Vehicle - Manufacturer', lib: 'fakerjs', fn: () => faker.vehicle.manufacturer() },
    { key: 'fakerjs.vehicle.model', name: 'Vehicle - Model', lib: 'fakerjs', fn: () => faker.vehicle.model() },
    { key: 'fakerjs.vehicle.type', name: 'Vehicle - Type', lib: 'fakerjs', fn: () => faker.vehicle.type() },
    { key: 'fakerjs.vehicle.vehicle', name: 'Vehicle - Vehicle', lib: 'fakerjs', fn: () => faker.vehicle.vehicle() },
    { key: 'fakerjs.vehicle.vin', name: 'Vehicle - VIN', lib: 'fakerjs', fn: () => faker.vehicle.vin() },
    { key: 'fakerjs.vehicle.vrm', name: 'Vehicle - VRM', lib: 'fakerjs', fn: () => faker.vehicle.vrm() },

    // Company
    { key: 'fakerjs.company.buzzAdjective', name: 'Company - Buzz Adjective', lib: 'fakerjs', fn: () => faker.company.buzzAdjective() },
    { key: 'fakerjs.company.buzzNoun', name: 'Company - Buzz Noun', lib: 'fakerjs', fn: () => faker.company.buzzNoun() },
    { key: 'fakerjs.company.buzzPhrase', name: 'Company - Buzz Phrase', lib: 'fakerjs', fn: () => faker.company.buzzPhrase() },
    { key: 'fakerjs.company.buzzVerb', name: 'Company - Buzz Verb', lib: 'fakerjs', fn: () => faker.company.buzzVerb() },
    { key: 'fakerjs.company.catchPhrase', name: 'Company - Catch Phrase', lib: 'fakerjs', fn: () => faker.company.catchPhrase() },
    { key: 'fakerjs.company.catchPhraseAdjective', name: 'Company - Catch Phrase Adjective', lib: 'fakerjs', fn: () => faker.company.catchPhraseAdjective() },
    { key: 'fakerjs.company.catchPhraseDescriptor', name: 'Company - Catch Phrase Descriptor', lib: 'fakerjs', fn: () => faker.company.catchPhraseDescriptor() },
    { key: 'fakerjs.company.catchPhraseNoun', name: 'Company - Catch Phrase Noun', lib: 'fakerjs', fn: () => faker.company.catchPhraseNoun() },
    { key: 'fakerjs.company.name', name: 'Company - Name', lib: 'fakerjs', fn: () => faker.company.name() },

    // Database
    { key: 'fakerjs.database.collation', name: 'Database - Collation', lib: 'fakerjs', fn: () => faker.database.collation() },
    { key: 'fakerjs.database.column', name: 'Database - Column', lib: 'fakerjs', fn: () => faker.database.column() },
    { key: 'fakerjs.database.engine', name: 'Database - Engine', lib: 'fakerjs', fn: () => faker.database.engine() },
    { key: 'fakerjs.database.mongodbObjectId', name: 'Database - MongoDB Object ID', lib: 'fakerjs', fn: () => faker.database.mongodbObjectId() },
    { key: 'fakerjs.database.type', name: 'Database - Type', lib: 'fakerjs', fn: () => faker.database.type() },

    // Food
    { key: 'fakerjs.food.adjective', name: 'Food - Adjective', lib: 'fakerjs', fn: () => faker.food.adjective() },
    { key: 'fakerjs.food.description', name: 'Food - Description', lib: 'fakerjs', fn: () => faker.food.description() },
    { key: 'fakerjs.food.dish', name: 'Food - Dish', lib: 'fakerjs', fn: () => faker.food.dish() },
    { key: 'fakerjs.food.ethnicCategory', name: 'Food - Ethnic Category', lib: 'fakerjs', fn: () => faker.food.ethnicCategory() },
    { key: 'fakerjs.food.fruit', name: 'Food - Fruit', lib: 'fakerjs', fn: () => faker.food.fruit() },
    { key: 'fakerjs.food.ingredient', name: 'Food - Ingredient', lib: 'fakerjs', fn: () => faker.food.ingredient() },
    { key: 'fakerjs.food.meat', name: 'Food - Meat', lib: 'fakerjs', fn: () => faker.food.meat() },
    { key: 'fakerjs.food.spice', name: 'Food - Spice', lib: 'fakerjs', fn: () => faker.food.spice() },
    { key: 'fakerjs.food.vegetable', name: 'Food - Vegetable', lib: 'fakerjs', fn: () => faker.food.vegetable() },

]