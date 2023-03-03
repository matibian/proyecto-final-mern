import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';





export default function SearchBar() {

    const [data, setData] = useState(null);
    const navigate = useNavigate()

    const bla = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    useEffect(() => {
        const products = collection(db, "products")
        getDocs(products)
            .then((res) => {
                const list = res.docs.map((product) => {
                    return {
                        id: product.id,
                        ...product.data()
                    }
                })
                setData(list)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <>
            {data ?
                <Autocomplete
                    id="serch_bar"
                    options={data}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, option) => {
                        navigate(`/detail/${option.id}`)
                    }}
                    style={{ width: "100%" }}
                    renderInput={(params) => {
                        const { InputLabelProps, InputProps, ...rest } = params;
                        return <StyledInputBase {...params.InputProps} {...rest} />
                    }}
                />
                :
                <StyledInputBase placeholder={"Cargando..."} />
            }
        </>
    )
}
