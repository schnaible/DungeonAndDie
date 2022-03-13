import React, {Fragment, useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import {presentationComponents, containerComponents}  from './MenuPresentationComponents';


import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import API from "../API_Interface/API_Interface";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TopBar = ({open, handleDrawerOpen, title, logoutAction}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.

    return (
        <Fragment>
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box width="100%" justifyContent="center" flex={1}>
                    </Box>
                    <Box width="100%" justifyContent="right" flex={1}>
                        <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </Fragment>
    )
};

const PresentationListItems = (props) => {
    return <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    '& > *': {
                        m: 1,
                    },
                }} button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>;
};

const ContainerListItems = (props) => {
    return  <div>
        {
            props.menuItemTitles.map(title =>
                <ListItem button onClick={() => props.onClick(title)} key={title}>
                    <ListItemText primary={title} key={title}/>
                    {
                        props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                    }
                </ListItem>
            )
        }
    </div>
};

const findSelectedComponent = (selectedItem) => {
    const component = [...presentationComponents(),
                        ...containerComponents()].filter(comp => comp.title === selectedItem);
    if(component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};

export default function Menu({title, logoutAction}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [sOpen, setSOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState('Summary');
    const [inGame, setInGame] = React.useState(false);

    useEffect(() => {//this useEffect is used to ensure the link to the backend is made and maintained
        const api = new API();
        async function getUserInfo() {
            api.getUserInfo('admin')
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                });
        }
        // let intervalId = setInterval(() => {
            getUserInfo();
        // }, 44*60*1000)
        // return () => clearInterval(intervalId);
    });
    console.log('in Menu');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
        setInGame(true);
        if (title === "Main menu")
            setInGame(false);
    };

    const buttons = [
        <Button key="one" onClick={() => {
            setSelectedItem("How To Play")
        }}>One</Button>,
        <Button key="two">Two</Button>,
        <Button key="three">Three</Button>,
    ];
    if (!inGame) {

        const imageStyle = {
            textAlign: 'center'
        };

        return (
            <Fragment>
                <p style={imageStyle}>
                    <img src={"https://blue.cs.sonoma.edu/~kschnaible/DungeonDieUpdate_.png"}/>
                </p>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    alignSelf: 'right',
                    '& > *': {
                        m: 4,

                    },
                }}
                >
                    <CssBaseline/>

                    <Divider/>


                    <List
                        align="center"


                    >


                        <Divider/>
                        <List>
                            <PresentationListItems selectedItem={selectedItem}
                                                   onClick={handleSelectedItem}
                                                   menuItemTitles={presentationComponents().map(comp => comp.title)}
                            />
                        </List>
                        <Divider/>

                    </List>
                </List>


                {findSelectedComponent(selectedItem).component}
            </Fragment>
        );
    } else//In the future the code in this return statement should be put in a popup window
    {
        return (
            <Fragment>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    height: 50,
                    '& > *': {
                        m: 1,
                    },
                }}
                >
                    <ButtonGroup>
                        <PresentationListItems selectedItem={selectedItem}
                                               onClick={handleSelectedItem}
                                               menuItemTitles={presentationComponents().map(comp => comp.title = "How To Play")}
                        />
                        <PresentationListItems selectedItem={selectedItem}
                                               onClick={handleSelectedItem}
                                               menuItemTitles={presentationComponents().map(comp => comp.title = "High Score")}
                        />
                        <PresentationListItems selectedItem={selectedItem}
                                               onClick={handleSelectedItem}
                                               menuItemTitles={presentationComponents().map(comp => comp.title = "Main menu")}
                        />
                        <PresentationListItems selectedItem={selectedItem}
                                               onClick={handleSelectedItem}
                                               menuItemTitles={presentationComponents().map(comp => comp.title = "Play Now")}
                        />
                    </ButtonGroup>


                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'right',
                    '& > *': {
                        m: 1,
                    },
                }}
                >
                    {findSelectedComponent(selectedItem).component}
                </Box>
            </Fragment>
        );
    }
}
