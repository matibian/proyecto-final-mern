import { LoadingButton } from '@mui/lab';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Orders({ orderDetail, loading, error }) {

    const { carrito, descuento, total, envio } = orderDetail;
    const navigate = useNavigate()

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10vh 0',
                height: '70vh',
                textAlign: 'center',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                },
            }}
            >
                <Paper elevation={3}>
                    <Grid sx={{ padding: '3vh 10vh' }}>
                        {loading
                            ?
                            <>
                                <LoadingButton loading sx={{ paddingTop: "10vh", height: 50 }} />
                                <Typography variant="h4" color="text.primary" sx={{ fontSize: 25, fontWeight: "bold", paddingTop: "5vh" }} >
                                    Espere un momento por favor
                                </Typography>
                            </>
                            :
                            <>
                                {total > 0
                                    ?
                                    <Grid sx={{ padding: '2vh 0' }}>
                                        <Typography variant="h4" color="text.primary" sx={{ fontSize: 25, fontWeight: "bold", padding: "5px" }} >
                                            Su pedido esta en proceso.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 19, fontWeight: "bold", padding: "5px" }} >
                                            En breve nos comunicaremos con vos.
                                        </Typography>
                                        <br />
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 19, fontWeight: "bold", padding: "5px" }} >
                                            Detalle del pedido:
                                        </Typography>
                                        <div style={{ textAlign: "left" }}>
                                            <table>
                                            <tbody style={{ borderSpacing: "5px" }}>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Cantidad</th>
                                                    <th>Total</th>
                                                </tr>
                                                {carrito.map((producto,index) => (
                                                    <tr key={producto.id}>
                                                        <td key={producto.name} >{producto.name}</td>
                                                        <td key={producto.id+index}>{producto.quantity}</td>
                                                        <td key={producto.name+index}>${(producto.quantity * producto.price).toLocaleString('de-DE')}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                            <br />
                                            Descuento: {descuento}
                                            <br />
                                            Envio: ${envio.toLocaleString('de-DE')}
                                            <br />
                                            Total: ${descuento === "NO" ? total.toLocaleString('de-DE') : (total * 0.9+ envio).toLocaleString('de-DE')}
                                        </div>
                                    </Grid>
                                    :
                                    <>
                                        <Typography variant="h4" color="text.primary" sx={{ fontSize: 22, fontWeight: "bold", paddingTop: "15vh" }} >
                                            {!error? "El ID que ingresaste es incorrecto.": "Hay un problema con el servidor."}
                                            <br />
                                            Intenta nuevamente
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            onClick={() => navigate(`/mis_pedidos/`)}
                                            color="text.primary"
                                            sx={{ fontSize: 16, fontWeight: "bold", marginTop: "15vh", cursor: "pointer" }} >
                                            <ArrowBackIosIcon /> volver
                                        </Typography>
                                    </>
                                }
                            </>
                        }
                    </Grid>
                </Paper>
            </Box>

        </>
    )
}
