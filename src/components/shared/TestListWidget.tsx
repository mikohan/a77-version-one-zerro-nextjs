import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { IShopCategory } from '~/interfaces/category';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface IProps {
  categories: IShopCategory[];
}

export default function NestedList({ categories }: IProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <div>
        <Button onClick={handleClick} variant="outlined">
          Expand
        </Button>
        <Collapse collapsedHeight={150} in={open} timeout="auto">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium at dignissimos, harum error officiis voluptatibus
              distinctio dolor obcaecati iure, rem numquam. Vitae provident
              iusto eligendi, dolorem temporibus rerum voluptas dolore!:
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium at dignissimos, harum error officiis voluptatibus
              distinctio dolor obcaecati iure, rem numquam. Vitae provident
              iusto eligendi, dolorem temporibus rerum voluptas dolore!:
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium at dignissimos, harum error officiis voluptatibus
              distinctio dolor obcaecati iure, rem numquam. Vitae provident
              iusto eligendi, dolorem temporibus rerum voluptas dolore!:
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium at dignissimos, harum error officiis voluptatibus
              distinctio dolor obcaecati iure, rem numquam. Vitae provident
              iusto eligendi, dolorem temporibus rerum voluptas dolore!:
            </li>
          </ul>
        </Collapse>
      </div>
      <List>
        {categories.map((category: IShopCategory) => (
          <ListItem key={category.id}>
            <Typography onClick={handleClick}>{category.name}</Typography>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div">
                {category.children?.map((child: IShopCategory) => (
                  <ListItem key={child.id}>{child.name}</ListItem>
                ))}
                <ListItem>some item</ListItem>
              </List>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
