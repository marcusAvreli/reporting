import { OAuth2Service } from "./services/oauth2.service";
import { ConfigService } from "./services/config.service";
import { IHttpConfig } from "./models/http-config.interface";

export function propertiesResolverFactory(appConfig: ConfigService, oAuth2Service: OAuth2Service, config: IHttpConfig): any {
  return () => {
    return appConfig.load(config)
      .toPromise()
      .then(() => {
        oAuth2Service.initialize();
      });
  };
}