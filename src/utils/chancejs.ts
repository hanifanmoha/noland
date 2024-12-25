import { Chance } from 'chance';
import { IMockOptions } from './mock';

const chance = new Chance();

export const CHANCE_MOCK_OPTIONS: IMockOptions[] = [
    // Basics
    { key: 'chance.bool', name: 'Basics - Bool', lib: 'chance', fn: () => chance.bool() },
    { key: 'chance.falsy', name: 'Basics - Falsy', lib: 'chance', fn: () => chance.falsy() },
    { key: 'chance.character', name: 'Basics - Character', lib: 'chance', fn: () => chance.character() },
    { key: 'chance.floating', name: 'Basics - Floating', lib: 'chance', fn: () => chance.floating() },
    { key: 'chance.integer', name: 'Basics - Integer', lib: 'chance', fn: () => chance.integer() },
    { key: 'chance.letter', name: 'Basics - Letter', lib: 'chance', fn: () => chance.letter() },
    { key: 'chance.natural', name: 'Basics - Natural', lib: 'chance', fn: () => chance.natural() },
    { key: 'chance.string', name: 'Basics - String', lib: 'chance', fn: () => chance.string() },

    // Text
    { key: 'chance.paragraph', name: 'Text - Paragraph', lib: 'chance', fn: () => chance.paragraph() },
    { key: 'chance.sentence', name: 'Text - Sentence', lib: 'chance', fn: () => chance.sentence() },
    { key: 'chance.syllable', name: 'Text - Syllable', lib: 'chance', fn: () => chance.syllable() },
    { key: 'chance.word', name: 'Text - Word', lib: 'chance', fn: () => chance.word() },

    // Person
    { key: 'chance.age', name: 'Person - Age', lib: 'chance', fn: () => chance.age() },
    { key: 'chance.birthday', name: 'Person - Birthday', lib: 'chance', fn: () => chance.birthday() },
    { key: 'chance.cf', name: 'Person - CF', lib: 'chance', fn: () => chance.cf() },
    { key: 'chance.cpf', name: 'Person - CPF', lib: 'chance', fn: () => chance.cpf() },
    { key: 'chance.first', name: 'Person - First', lib: 'chance', fn: () => chance.first() },
    { key: 'chance.gender', name: 'Person - Gender', lib: 'chance', fn: () => chance.gender() },
    { key: 'chance.last', name: 'Person - Last', lib: 'chance', fn: () => chance.last() },
    { key: 'chance.name', name: 'Person - Name', lib: 'chance', fn: () => chance.name() },
    { key: 'chance.prefix', name: 'Person - Prefix', lib: 'chance', fn: () => chance.prefix() },
    { key: 'chance.ssn', name: 'Person - SSN', lib: 'chance', fn: () => chance.ssn() },
    { key: 'chance.suffix', name: 'Person - Suffix', lib: 'chance', fn: () => chance.suffix() },

    // Thing
    { key: 'chance.animal', name: 'Thing - Animal', lib: 'chance', fn: () => chance.animal() },

    // Mobile
    { key: 'chance.android_id', name: 'Mobile - Android ID', lib: 'chance', fn: () => chance.android_id() },
    { key: 'chance.apple_token', name: 'Mobile - Apple Token', lib: 'chance', fn: () => chance.apple_token() },
    { key: 'chance.bb_pin', name: 'Mobile - BB PIN', lib: 'chance', fn: () => chance.bb_pin() },
    { key: 'chance.wp7_anid', name: 'Mobile - WP7 ANID', lib: 'chance', fn: () => chance.wp7_anid() },
    { key: 'chance.wp8_anid2', name: 'Mobile - WP8 ANID2', lib: 'chance', fn: () => chance.wp8_anid2() },

    // Web
    { key: 'chance.avatar', name: 'Web - Avatar', lib: 'chance', fn: () => chance.avatar() },
    { key: 'chance.color', name: 'Web - Color', lib: 'chance', fn: () => chance.color() },
    { key: 'chance.company', name: 'Web - Company', lib: 'chance', fn: () => chance.company() },
    { key: 'chance.domain', name: 'Web - Domain', lib: 'chance', fn: () => chance.domain() },
    { key: 'chance.email', name: 'Web - Email', lib: 'chance', fn: () => chance.email() },
    { key: 'chance.fbid', name: 'Web - FBID', lib: 'chance', fn: () => chance.fbid() },
    { key: 'chance.google_analytics', name: 'Web - Google Analytics', lib: 'chance', fn: () => chance.google_analytics() },
    { key: 'chance.hashtag', name: 'Web - Hashtag', lib: 'chance', fn: () => chance.hashtag() },
    { key: 'chance.ip', name: 'Web - IP', lib: 'chance', fn: () => chance.ip() },
    { key: 'chance.ipv6', name: 'Web - IPv6', lib: 'chance', fn: () => chance.ipv6() },
    { key: 'chance.klout', name: 'Web - Klout', lib: 'chance', fn: () => chance.klout() },
    { key: 'chance.profession', name: 'Web - Profession', lib: 'chance', fn: () => chance.profession() },
    { key: 'chance.tld', name: 'Web - TLD', lib: 'chance', fn: () => chance.tld() },
    { key: 'chance.twitter', name: 'Web - Twitter', lib: 'chance', fn: () => chance.twitter() },
    { key: 'chance.url', name: 'Web - URL', lib: 'chance', fn: () => chance.url() },

    // Location
    { key: 'chance.address', name: 'Location - Address', lib: 'chance', fn: () => chance.address() },
    { key: 'chance.altitude', name: 'Location - Altitude', lib: 'chance', fn: () => chance.altitude() },
    { key: 'chance.areacode', name: 'Location - Area Code', lib: 'chance', fn: () => chance.areacode() },
    { key: 'chance.city', name: 'Location - City', lib: 'chance', fn: () => chance.city() },
    { key: 'chance.coordinates', name: 'Location - Coordinates', lib: 'chance', fn: () => chance.coordinates() },
    { key: 'chance.country', name: 'Location - Country', lib: 'chance', fn: () => chance.country() },
    { key: 'chance.depth', name: 'Location - Depth', lib: 'chance', fn: () => chance.depth() },
    { key: 'chance.geohash', name: 'Location - Geohash', lib: 'chance', fn: () => chance.geohash() },
    { key: 'chance.latitude', name: 'Location - Latitude', lib: 'chance', fn: () => chance.latitude() },
    { key: 'chance.locale', name: 'Location - Locale', lib: 'chance', fn: () => chance.locale() },
    { key: 'chance.longitude', name: 'Location - Longitude', lib: 'chance', fn: () => chance.longitude() },
    { key: 'chance.phone', name: 'Location - Phone', lib: 'chance', fn: () => chance.phone() },
    { key: 'chance.postal', name: 'Location - Postal', lib: 'chance', fn: () => chance.postal() },
    { key: 'chance.postcode', name: 'Location - Postcode', lib: 'chance', fn: () => chance.postcode() },
    { key: 'chance.province', name: 'Location - Province', lib: 'chance', fn: () => chance.province() },
    { key: 'chance.state', name: 'Location - State', lib: 'chance', fn: () => chance.state() },
    { key: 'chance.street', name: 'Location - Street', lib: 'chance', fn: () => chance.street() },
    { key: 'chance.zip', name: 'Location - ZIP', lib: 'chance', fn: () => chance.zip() },

    // Time
    { key: 'chance.ampm', name: 'Time - AM/PM', lib: 'chance', fn: () => chance.ampm() },
    { key: 'chance.date', name: 'Time - Date', lib: 'chance', fn: () => chance.date() },
    { key: 'chance.hammertime', name: 'Time - Hammertime', lib: 'chance', fn: () => chance.hammertime() },
    { key: 'chance.hour', name: 'Time - Hour', lib: 'chance', fn: () => chance.hour() },
    { key: 'chance.millisecond', name: 'Time - Millisecond', lib: 'chance', fn: () => chance.millisecond() },
    { key: 'chance.minute', name: 'Time - Minute', lib: 'chance', fn: () => chance.minute() },
    { key: 'chance.month', name: 'Time - Month', lib: 'chance', fn: () => chance.month() },
    { key: 'chance.second', name: 'Time - Second', lib: 'chance', fn: () => chance.second() },
    { key: 'chance.timestamp', name: 'Time - Timestamp', lib: 'chance', fn: () => chance.timestamp() },
    { key: 'chance.timezone', name: 'Time - Timezone', lib: 'chance', fn: () => chance.timezone() },
    { key: 'chance.weekday', name: 'Time - Weekday', lib: 'chance', fn: () => chance.weekday({}) },
    { key: 'chance.year', name: 'Time - Year', lib: 'chance', fn: () => chance.year() },

    // Finance
    { key: 'chance.cc', name: 'Finance - Credit Card', lib: 'chance', fn: () => chance.cc() },
    { key: 'chance.cc_type', name: 'Finance - Credit Card Type', lib: 'chance', fn: () => chance.cc_type() },
    { key: 'chance.currency', name: 'Finance - Currency', lib: 'chance', fn: () => chance.currency() },
    { key: 'chance.currency_pair', name: 'Finance - Currency Pair', lib: 'chance', fn: () => chance.currency_pair() },
    { key: 'chance.dollar', name: 'Finance - Dollar', lib: 'chance', fn: () => chance.dollar() },
    { key: 'chance.euro', name: 'Finance - Euro', lib: 'chance', fn: () => chance.euro() },
    { key: 'chance.exp', name: 'Finance - Expiration', lib: 'chance', fn: () => chance.exp() },
    { key: 'chance.exp_month', name: 'Finance - Expiration Month', lib: 'chance', fn: () => chance.exp_month() },
    { key: 'chance.exp_year', name: 'Finance - Expiration Year', lib: 'chance', fn: () => chance.exp_year() },
    { key: 'chance.capitalize', name: 'Helpers - Capitalize', lib: 'chance', fn: () => chance.capitalize('example') },
    { key: 'chance.mixin', name: 'Helpers - Mixin', lib: 'chance', fn: () => chance.mixin({ custom: () => 'custom function' }) },
    { key: 'chance.pad', name: 'Helpers - Pad', lib: 'chance', fn: () => chance.pad(5, 3) },
    { key: 'chance.pick', name: 'Helpers - Pick', lib: 'chance', fn: () => chance.pick(['a', 'b', 'c']) },
    { key: 'chance.pickone', name: 'Helpers - Pick One', lib: 'chance', fn: () => chance.pickone(['a', 'b', 'c']) },
    { key: 'chance.pickset', name: 'Helpers - Pick Set', lib: 'chance', fn: () => chance.pickset(['a', 'b', 'c'], 2) },
    { key: 'chance.shuffle', name: 'Helpers - Shuffle', lib: 'chance', fn: () => chance.shuffle(['a', 'b', 'c']) },

    // Miscellaneous
    { key: 'chance.coin', name: 'Miscellaneous - Coin Flip', lib: 'chance', fn: () => chance.coin() },
    { key: 'chance.guid', name: 'Miscellaneous - GUID', lib: 'chance', fn: () => chance.guid() },
    { key: 'chance.hash', name: 'Miscellaneous - Hash', lib: 'chance', fn: () => chance.hash() },
    { key: 'chance.n', name: 'Miscellaneous - N', lib: 'chance', fn: () => chance.n(chance.integer, 5) },
    { key: 'chance.normal', name: 'Miscellaneous - Normal', lib: 'chance', fn: () => chance.normal() },
    { key: 'chance.radio', name: 'Miscellaneous - Radio', lib: 'chance', fn: () => chance.radio() },
    { key: 'chance.rpg', name: 'Miscellaneous - RPG', lib: 'chance', fn: () => chance.rpg('3d6') },
    { key: 'chance.tv', name: 'Miscellaneous - TV', lib: 'chance', fn: () => chance.tv() },
    { key: 'chance.unique', name: 'Miscellaneous - Unique', lib: 'chance', fn: () => chance.unique(chance.integer, 3, { min: 1, max: 10 }) },
    { key: 'chance.weighted', name: 'Miscellaneous - Weighted', lib: 'chance', fn: () => chance.weighted(['a', 'b', 'c'], [1, 2, 3]) },
];

