<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        // 直接実行する
        // factory(App\User::class, 5)->create()->each(function ($user) {
        //     $user->talks()->save(
        //         factory(App\Talk::class)->make()
        //     );
        // });
        factory(App\User::class, 5)->create();
        factory(App\Talk::class, 20)->create();
    }
}
