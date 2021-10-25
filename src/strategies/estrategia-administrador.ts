import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');
export class EstrategiaAdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let rol_admin = Keys.rol_administrador;
      let url_token = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_token}=${Keys.rol_administrador}`;
      let r = "";
      await fetch(url_token)
        .then(async (res: any) => {
          r = await res.text()
          console.log(r)
        })
      console.log("R: " + r)
      switch (r) {
        case "OK":
          let perfil: UserProfile = Object.assign({
            admin: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("El rol del token no es válido");
          break;
        case "":
          throw new HttpErrors[401]("El token no es válido");
          break;
      }
    } else {
      throw new HttpErrors[401]("La request no tiene un token");
    }
  }

}
