import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class errorMessage {
  constructor(
    private templateRef: TemplateRef<any>,

    private viewContainer: ViewContainerRef
  ) {}

  @Input() set hasError(hasError: boolean) {
    if (!hasError) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
