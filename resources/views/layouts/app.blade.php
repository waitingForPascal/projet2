<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/entete.css') }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="app" class="page-container">

        <nav class="navbarEntete">

        <div class="nav-menu">
            <a href="/home" ><img src="{{ asset('img/vino.png') }}" alt="logo" class="logo"></a>

            <div class="hamburger-menu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>

        </div>



            <ul class="nav-links">
            @guest
                @if (Route::has('login'))
                    <li class="navEntete-item">
                        <a class="navEntete-link" href="{{ route('login') }}">Se connecter</a>
                    </li>
                @endif

                @if (Route::has('register'))
                    <li class="navEntete-item">
                        <a class="navEntete-link" href="{{ route('register') }}">Crée un compte</a>
                    </li>
                @endif
            @else
                <li class="navEntete-item">
                    <a class="navEntete-link" href="#" role="button" href="#}}">
                        Bonjour, {{ Auth::user()->name }}
                    </a>
                </li>

                <li class="navEntete-item retournCellier">
                    <a class="" href="{{ route('accueil') }}">Liste des cellier</a>     
                </li>

                <li class="navEntete-item">
                    <a class="" href="{{ route('logout') }}">Se déconnecter</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            @endguest
            </ul>
        </nav>

        <main class="wrapper-contenu">
            @yield('content')
        </main>
<!-- 
        <footer>
            <div class="footer-container">
                <p>&copy; 2023 VINO. Tous les droits sont réservés.</p>
            </div>
        </footer> -->
    </div>
    <script src="{{ asset('script/main.js') }}"></script>

</body>
</html>
