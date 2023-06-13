/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup);

    WA.room.area.onEnter('break-room').subscribe(() => {
        WA.player.setOutlineColor(0, 255, 0);
        console.log('entered break room');
    })

    //RTR piecake mirage
    WA.state.onVariableChange('piecake').subscribe((value) => {

        let temp = typeof value === 'string' ? value : null;

        WA.room.setTiles([
            {x: 15, y: 8, tile: temp, layer: 'rtr_interactables'}
        ]);

        console.log('variable changed');
    });

    //RTR lights out?
    WA.state.onVariableChange('lights-1').subscribe((value) => {

        let temp = typeof value === 'string' ? value : null;

        WA.room.setTiles([
            {x: 3, y: 16, tile: temp, layer: 'rtr_interactables'}
        ]);

        console.log('variable changed for lights-1');
    });

    WA.state.onVariableChange('lights-2').subscribe((value) => {

        let temp = typeof value === 'string' ? value : null;

        WA.room.setTiles([
            {x: 6, y: 16, tile: temp, layer: 'rtr_interactables'}
        ]);

        console.log('variable changed for lights-2');
    });

    WA.state.onVariableChange('lights-3').subscribe((value) => {

        let temp = typeof value === 'string' ? value : null;

        WA.room.setTiles([
            {x: 9, y: 16, tile: temp, layer: 'rtr_interactables'}
        ]);

        console.log('variable changed for lights-3');
    });

    //Polling
    WA.room.area.onEnter('rtr-var-test_1').subscribe(() => {
        (WA.state.rtr_var_1 as number)++;
    });

    WA.room.area.onEnter('rtr-var-test_2').subscribe(() => {
        (WA.state.rtr_var_2 as number)++;
        console.log(WA.state.rtr_var_2)
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
