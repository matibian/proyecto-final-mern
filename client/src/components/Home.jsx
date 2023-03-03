import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate()

    return (
        <>
            <div id="homepic">
                <div id="home">
                    <h1>
                        <span className="titlehome">
                            Vortex
                        </span>
                    </h1>
                    <h2>
                        <span className="titlehome">
                            FASHION CHANGING ALWAYS
                        </span>
                    </h2>
                    <Button
                        onClick={() => navigate(`/category/all`)}
                        variant="contained"
                        sx={{
                            fontSize: "30px",
                            backgroundColor: "rgb(201 160 155)"
                        }}
                    >
                        SHOP
                    </Button>
                    <h3>
                        <span className="titlehome">
                            Enfocados en estilo y comodidad
                        </span>
                    </h3>
                </div>
            </div>

        </>
    )
}
