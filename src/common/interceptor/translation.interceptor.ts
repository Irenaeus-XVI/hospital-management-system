import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isNil, isObject } from 'lodash';
import { Observable, map } from 'rxjs';

type ResponseData = {
  data: responseBody | responseBody[];
};

type responseBody = {
  name: string;
  description: string;
  question: string;
  translation: {
    _lang: string;
    name: string;
    question: string;
    description: string;
  };
  content?: Array<{
    title: string;
    body: string;
    translation: {
      _lang: string;
      title: string;
      body: string;
    };
  }>;
  sections?: Array<{
    name: string;
    description: string;
    translation: {
      _lang: string;
      name: string;
      description: string;
    };
  }>;
};

@Injectable()
export class I18nInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const lang = req.headers['accept-language'];

    if (!lang || lang === 'ar') return next.handle();

    return next.handle().pipe(map((res) => (res ? this.applyTranslation(res) : res)));
  }

  private applyTranslation(res: ResponseData) {
    const { data } = res;

    if (isNil(data) || !isObject(data)) {
      return res;
    }

    if (Array.isArray(data)) {
      data.forEach((el) => {
        this.translateElement(el);
        if (el.content) {
          this.translateContent(el.content);
        }
        if (el.sections) {
          this.translateContent(el.sections);
        }
      });
    } else {
      this.translateElement(data);
      if (data.content) {
        console.log('object');
        this.translateContent(data.content);
      }
      if (data.sections) {
        this.translateContent(data.sections);
      }
    }

    return res;
  }

  private translateElement = (element: any) => {
    const translation = element.translation ?? undefined;

    if (translation) {
      const originalelement = { ...element };
      this.applyTranslationToFields(element, translation);
      this.handleFallbackTranslation(element, originalelement, translation);
    }
  };

  private translateContent(content: any[]) {
    if (!Array.isArray(content)) {
      return;
    }
    content.forEach((element) => {
      const translation = element.translation ?? undefined;
      if (translation) {
        const originalelement = { ...element };
        this.applyTranslationToFields(element, translation);
        this.handleFallbackTranslation(element, originalelement, translation);
      }
    });
  }

  private applyTranslationToFields(element: any, translation: any) {
    if (element.name && translation) {
      element.name = translation.name;
    }

    if (element.description && translation) {
      element.description = translation.description;
    }

    if (element.title && translation) {
      element.title = translation.title;
    }

    if (element.body && translation) {
      element.body = translation.body;
    }
    if (element.question && translation) {
      element.question = translation.question;
    }
  }

  private handleFallbackTranslation(element: any, originalelement: any, translation: any) {
    if (element.name === translation.name) {
      translation.name = originalelement.name;
    }

    if (element.description === translation.description) {
      translation.description = originalelement.description;
    }

    if (element.title === translation.title) {
      translation.title = originalelement.title;
    }

    if (element.body === translation.body) {
      translation.body = originalelement.body;
    }

    if (element.question === translation.question) {
      translation.question = originalelement.question;
    }
  }
}
