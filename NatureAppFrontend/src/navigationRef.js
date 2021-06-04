//Este ficheiro é usado para fazer navegação para ficheiros que não sejam componentes do react
import { NavigationActions } from "react-navigation";

let navigator; //Esta variavél contém acesso à navegação entre screens.

export const setNavigator = (nav) => {
  // esta função serve para ir buscar o acesso às propriedades de navegação
  navigator = nav;
};

export const navigate = (routeName, params) => {
  // função que faz navegar entre screens
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
};
