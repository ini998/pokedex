/**
 * Created by daemo_000 on 08.04.2016.
 */
var pokemonById = {};
var pokemons = [];
var page = 1;
var perPage = 12;

$.getJSON( "https://pokeapi.co/api/v1/pokedex/1/", function( data ) {
    var count = 0;
    pokemons = data.pokemon;
    pokemons.forEach(function(pokemon){
        $.getJSON( "https://pokeapi.co/" + pokemon.resource_uri, function( data ) {
            count += 1;
            var id = data.pkdx_id;
            pokemonById[id] = {};
            pokemonById[id].id = data.pkdx_id;
            pokemonById[id].name = pokemon.name;
            pokemonById[id].types = data.types;
            pokemonById[id].attack = data.attack;
            pokemonById[id].defense = data.defense;
            pokemonById[id].hp = data.hp;
            pokemonById[id].sp_atk = data.sp_atk;
            pokemonById[id].sp_def = data.sp_def;
            pokemonById[id].speed = data.speed;
            pokemonById[id].weight = data.weight;
            pokemonById[id].totalMoves = data.moves.length;

           // if (count == 12) {
                render(pokemonById);
           // }
        });
    });
});
function render(itemsById) {
    function renderTypes(types){
        var str = '';
        types.forEach(function(type) {
            str += '<button type=button class="btn '+ type.name + '">' + type.name.charAt(0).toUpperCase() + type.name.slice(1) + '</button>';
        });
        return '<p>' + str + '</p>';
    }

    function renderItem(item) {
        return '' +
            '<div class="col-sm-4" onclick="showMore('+ item.id +')">' +
                '<div class="thumbnail">' +
                    '<div class="text-center">' +
                        '<a href="#"><img src="http://pokeapi.co/media/img/' + item.id +  '.png" style="height: 120px"/></a>' +
                        '<div>' + item.name.charAt(0).toUpperCase() + item.name.slice(1) + '</div>' +
                    '</div>' +
                    '<div class="caption">'+ renderTypes(item.types) + '</div>' +
                '</div>' +
            '</div>'
    }

    const list = Object
        .keys(itemsById)
        .slice(0, page * perPage)
        .map(function(key){
            return renderItem(itemsById[key])
        });

    $('#list').html(list.join(''));
}

function showMore(id) {
    var item = pokemonById[id];
    var str = '';
    function renderTypes(types){
        types.forEach(function(type) {
            str += '<tr>' +
                '<td>Type</td>'+
                '<td>' + type.name.charAt(0).toUpperCase() + type.name.slice(1) +'</td>'+
                '</tr>'
        });
        return str;
    }
   var info =
        '<span id="btn-close" class="col-sm-12 col-xs-12" style="margin-top: 2px">' +
            '<button class="close" aria-label="Close" onclick="clearInfoBox()"><span aria-hidden="true">&times;</span></button>' +
        '</span>' +
       '<div class="thumbnail">'+
            '<div class="text-center">' +
                '<a href="#"><img src="http://pokeapi.co/media/img/' + item.id +  '.png" style="height: 120px"/></a>' +
                    '<div>' + item.name.charAt(0).toUpperCase() + item.name.slice(1) + '</div>' +
                '</div>' +
       '<table class="table table-bordered">'+ renderTypes(item.types)+
           '<tr>' +
                '<td>Attack</td>'+
                '<td>'+ item.attack +'</td>'+
           '</tr>'+
           '<tr>' +
                '<td>Defense</td>'+
                '<td>'+ item.defense +'</td>'+
           '</tr>'+
           '<tr>' +
                '<td>HP</td>'+
                '<td>'+ item.hp +'</td>'+
           '</tr>'+
            '<tr>' +
                '<td>SP Attack</td>'+
                '<td>'+ item.sp_atk +'</td>'+
            '</tr>'+
            '<tr>' +
                '<td>SP Defence</td>'+
                '<td>'+ item.sp_atk +'</td>'+
            '</tr>'+
            '<tr>' +
                '<td>Speed</td>'+
                '<td>'+ item.speed +'</td>'+
            '</tr>'+
            '<tr>' +
                '<td>Weight</td>'+
                '<td>'+ item.weight +'</td>'+
            '</tr>'+
            '<tr>' +
                '<td>Total moves</td>'+
                '<td>'+ item.totalMoves +'</td>'+
            '</tr>'+
       '</table>'+
   '</div>';
    $('.info').html(info);
}

function increasePage() {
    page += 1;
    render(pokemonById);
}

function clearInfoBox(e) {
    $('.info').empty();
}


