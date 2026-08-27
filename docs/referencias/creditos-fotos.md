# Fotos de la landing — de dónde salen y qué obliga cada licencia

Las cuatro fotos son de **Wikimedia Commons**, todas con licencia que permite uso comercial.
Se eligieron dando prioridad a material de Ecuador cuando existía.

| Archivo | Foto | Autor | Licencia | Obliga a |
|---|---|---|---|---|
| `curso-cacao.jpg` | [Cacao Tree (Theobroma cacao) green pods](https://commons.wikimedia.org/wiki/File:Cacao_Tree_(Theobroma_cacao)_green_pods_(17348751253).jpg) | Bernard DUPONT | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | Atribución + compartir igual |
| `curso-banano.jpg` | [Banana plantation, Ecuador](https://commons.wikimedia.org/wiki/File:Banana_plantation,_Ecuador.jpg) | Dave Lonsdale | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | Atribución |
| `curso-arroz.jpg` | [Harvesting paddy](https://commons.wikimedia.org/wiki/File:Harvesting_paddy.jpg) | Zaheed Sarwer Khan | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | Atribución |
| `campo.jpg` | [Ecuadorian farmers](https://commons.wikimedia.org/wiki/File:Ecuadorian_farmers.jpg) | Kiwa Natural Life | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Atribución + compartir igual |

Las cuatro están recortadas al encuadre que pide cada sitio. Los originales no se modificaron
de otra forma.

## Qué hay que saber antes de publicar de verdad

▸ **La atribución no es opcional.** CC BY y CC BY-SA la exigen, y por eso está en el pie de la
página —no solo en este fichero—. Si alguien borra ese bloque del pie, la página deja de
cumplir la licencia.

▲ **Dos son CC BY-SA**, que además de atribución pide *compartir igual*: una obra derivada se
licencia bajo la misma licencia. Recortar cuenta como derivar. Para una página web es una
obligación que se cumple con la atribución y el enlace a la licencia, que es lo que hay, pero
es una carga que no hace falta arrastrar.

▸ **La salida limpia es material propio.** El Ministerio tiene fotos del territorio y de las
unidades productivas. En cuanto entreguen las suyas, se cambian estas cuatro, se borra
`CREDITOS_FOTOS` de `web/src/lib/contenido.ts` y el bloque del pie desaparece solo.

## Lo que había antes

Hasta el 2026-08-26 estas cuatro imágenes eran **recortes de las capturas del SEAL**, puestas
para que la maqueta no se viera vacía. No eran publicables: material de otra institución usado
sin permiso. Se borraron.

## Cómo se buscaron

Con la API de Wikimedia Commons filtrando por licencia y tamaño mínimo. El script quedó en
`buscar-fotos-commons.py`, en esta misma carpeta.
