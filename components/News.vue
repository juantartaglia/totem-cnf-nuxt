<template>
    <div class="noticia">
        <div class="titulo">
            <div class="left">{{title}}</div>
            <div class="clear"></div>
        </div>
        <div class="fecha">{{published}}</div>
        <div class="data">
            <a href="novedades/26_cruda.jpg" title="DÍA DEL NIÑO" class="popup_img left">
                <img src="novedades/26_grande.jpg" alt="DÍA DEL NIÑO">
            </a>
            <div class="left">
                {{body}}
                <div class="oculto">
                </div>
                <br>
                <a title="novedades" href="#" class="vermas">| ver más |</a>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "News",
    data  () {
        return {
            title: "Titulo",
            image: "http://localhost/images/prueba.png",
            slug: "Subtutulo",
            body: "Body con contenido",
            pubished: '20-03-2020'
        }
    }
}
</script>

<style>

</style>