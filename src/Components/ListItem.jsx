import React from 'react'
import '../App.css';

export default function ListItem({ task }) {


    return (

        <input type="text" value={task} readOnly />

    )
}
