@extends('layouts.app')

@section('content')

<div class="login-box">
    <h2>Créer un compte</h2>
    <form method="POST" action="{{ route('register') }}">
        @csrf


        <label for="name">Nom</label>
        <input type="text" id="name" name="name" value="{{ old('name') }}" class=" @error('name') is-invalid @enderror" required autocomplete="name" autofocus>
        @error('name')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="email">Courriel</label>
        <input type="text" id="email" name="email" value="{{ old('email') }}" class=" @error('email') is-invalid @enderror" required autocomplete="email" autofocus>
        @error('email')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
        @error('password')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <label for="password_confirmation">Confirmer le mot de passe</label>
        <input type="password" id="password_confirmation" name="password_confirmation" class=" @error('password') is-invalid @enderror" required autocomplete="current-password">
        @error('password_confirmation')
            <span class="error_message" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <input type="hidden" name="privilege" value="usager">
        <input type="submit" value="Soumettre" class="login_submit">
    </form>
</div>


@endsection
