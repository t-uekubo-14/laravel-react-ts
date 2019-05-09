<?php

namespace App\Http\Middleware;

use Closure;

class RequestMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    if (in_array(app()->environment(), ["local", "development"])) {
      $this->writeLog($request);
    }
    return $next($request);
  }

  private function writeLog($request)
  {
    $query = collect($request->all())->except("q")->all();
    \Log::debug(
      $request->method(),
      [
        "path" => $request->path(),
        "query" => http_build_query($query)
      ]
    );
  }
}
