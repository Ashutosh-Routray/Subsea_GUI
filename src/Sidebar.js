import React from 'react';
import Component1_Menu from './assets/component1_menu.png';
import Component2_Menu from './assets/component2_menu.png';
import Component3_Menu from './assets/component3_menu.png';

import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';


export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className='center'>
            <Tooltip title="Component 1">

                <Fab size="secondary" aria-label="add" onDragStart={(event) => onDragStart(event, 'Component1')} draggable>
                    <img src={Component1_Menu} alt="Component1MenuIcon"></img>
                </Fab>
            </Tooltip>
            <br />
            <br />
            <Tooltip title="Component 2">

                <Fab size="secondary" aria-label="add" onDragStart={(event) => onDragStart(event, 'Component2')} draggable>
                    <img src={Component2_Menu} alt="Component2MenuIcon"></img>
                </Fab>
            </Tooltip>

            <br />
            <br />
            <Tooltip title="Component 3">
                <Fab size="secondary" aria-label="add" onDragStart={(event) => onDragStart(event, 'Component3')} draggable>
                    <img src={Component3_Menu} alt="Component3MenuIcon"></img>
                </Fab>
            </Tooltip>

            <br />
            <br />
            <Tooltip title="Basic Text Box">
                <Fab size="secondary" aria-label="add" onDragStart={(event) => onDragStart(event, 'text')} draggable>
                    Text
                </Fab>
            </Tooltip>

            <br />
            <br />
            <Tooltip title="Textbox">
                <Fab size="secondary" aria-label="add" onDragStart={(event) => onDragStart(event, 'complextext')} draggable>
                    Text
                </Fab>
            </Tooltip>

            <br />
            <br />

        </div >
    );
};
