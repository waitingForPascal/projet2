<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bouteilles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('image');
            $table->string('pays');
            $table->string('code_saq');
            $table->string('description');
            $table->string('code_saq');
            $table->float('prix', 2);
            $table->integer('note');
            $table->date("millesime");
            $table->date("garde_jusqua");
            $table->string('url_sql');
            $table->string('url_ing');
            $table->string('format');
            $table->integer('type');



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bouteilles');
    }
};
