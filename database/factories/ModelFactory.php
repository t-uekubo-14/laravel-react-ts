<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->unique()->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Talk::class, function (Faker\Generator $faker) {
    return [
        'message' => $faker->text(150),
        'contributer_id' => $faker->numberBetween(1, 5),
    ];
});
