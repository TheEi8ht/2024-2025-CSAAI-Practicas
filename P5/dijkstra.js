function findDijkstra(nodo_inicial, nodo_final) {

    let nodos_visitados = [nodo_inicial];
    let nodos_no_visitables = [nodo_inicial];

    let caminos_nuevos = [];

    let distancia_nodos = {[nodo_inicial.id]: {nodo: nodo_inicial, distancia: 0}};
    let caminos_generados = [];

    let ayu = true;

    while (ayu)  {

        for (let nodo of nodos_visitados)   {
            
            let caminos_disponibles = [];
    
            for (let camino of nodo.caminos)    {
    
                if (!nodos_no_visitables.includes(camino.go))   {
                    
                    caminos_disponibles.push(camino);
    
                }
    
            }
    
            let minimo = 0;
    
            for (let cam_disp = 0; cam_disp < caminos_disponibles.length; cam_disp++)    {
                
                if (caminos_disponibles[cam_disp].peso < caminos_disponibles[minimo].peso) {
                    
                    minimo = cam_disp;
    
                }
    
            }
            
            caminos_nuevos.push({camino: caminos_disponibles[minimo], peso: caminos_disponibles[minimo].peso + distancia_nodos[nodo.id].distancia})
    
        }
    
        let cam_min = caminos_nuevos[0];
    
        for (let cam_new of caminos_nuevos)    {
    
            if (cam_new.peso < cam_new.peso)    {
    
                cam_min = cam_new;
    
            }
    
        }
    
        nodos_visitados.push(cam_min.camino.go);
        nodos_no_visitables.push(cam_min.camino.go);
        caminos_generados.push(cam_min);
        distancia_nodos[cam_min.camino.go.id] = {nodo: cam_min.camino.go, distancia: cam_min.peso};

        for (let nodo of nodos_visitados)   {
            
            if ([...nodo.caminos].filter(n => !nodos_no_visitables.includes(n.go)).length == 0)    {
                
                nodos_visitados = nodos_visitados.filter(n => n != nodo);
    
            }
    
        }
    
        caminos_nuevos = [];
        
        if (cam_min.camino.go == nodo_final)    {

            ayu = !ayu;

        }

    }

    let camino_final = [nodo_final];
    let siguiente_nodo;
    let siguiente_camino;
    let tiempo = nodo_final.delay;

    while(!ayu) {

        siguiente_camino = caminos_generados.filter(c => c.camino.go == camino_final[0])[0];
        siguiente_nodo = siguiente_camino.camino.in;

        camino_final.unshift(siguiente_nodo);

        tiempo += siguiente_nodo.delay;

        if (siguiente_nodo == nodo_inicial) {

            ayu = !ayu;

        }

    }

    console.log(camino_final, tiempo);

    return [camino_final, tiempo];

}