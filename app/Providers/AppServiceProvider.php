<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // MySQL 文字列最大桁数の問題回避
        Schema::defaultStringLength(191);

        // 本番環境以外はSQLログを出力
        if (config('app.env') !== 'production') {
            DB::listen(function ($query) {
                // バインド変数を当て込む
                $sql = $query->sql;
                for ($i = 0; $i < count($query->bindings); $i++) {
                    $sql = preg_replace("/\?/", $query->bindings[$i], $sql, 1);
                }
                // 出力
                \Log::info("[SQL] ({$query->time}ms) --- $query->sql");
            });
        }
    }
}
