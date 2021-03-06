<!doctype html>
<html lang="en">
    <head lang="{{ app()->getLocale() }}">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <header>
            @yield('header')
        </header>
        <div id="app">
            @yield('content')
        </div>
        <footer>
            @yield('footer')
        </footer>
        <!-- Scripts -->
        <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
        <script src="{{ asset('js/app.js') }}"></script>
        
        @yield('scripts')
        
    </body>
</html>