import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef,
  DoCheck, ElementRef, EventEmitter, Injector, Input, OnDestroy,
  Output, ViewEncapsulation
} from '@angular/core';

import { EmbeddableComponents } from 'app/embedded/embedded.module';
import { DocumentContents } from 'app/shared/document.service';
import { Title } from '@angular/platform-browser';

interface EmbeddableComponentFactory {
  contentPropertyName: string;
  componentFactory: ComponentFactory<any>;
}

// Initialization prevents flicker once pre-rendering is on
const initialDocViewerElement = document.querySelector('app-doc-viewer');
const initialDocViewerContent = initialDocViewerElement ? initialDocViewerElement.innerHTML : '';

@Component({
  selector: 'app-doc-viewer',
  template: ''
})
export class DocViewerComponent implements DoCheck, OnDestroy {

  private embeddableComponentFactories: Map<string, EmbeddableComponentFactory>;
  private embeddedComponentInstances: ComponentRef<any>[] = [];
  private docElement: HTMLElement;

  @Output()
  docRendered = new EventEmitter();

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    docElementRef: ElementRef,
    embeddableComponents: EmbeddableComponents,
    private injector: Injector,
    private titleService: Title
    ) {

    // Create factories for each type of embeddable component
    this.createEmbeddedComponentFactories(embeddableComponents, componentFactoryResolver);

    // Security: the initialDocViewerContent comes from the pre-rendered DOM
    // and is considered to be safe
    this.docElement = docElementRef.nativeElement;
    this.docElement.innerHTML = initialDocViewerContent;
  }

  @Input()
  set doc(newDoc: DocumentContents) {
    this.destroyEmbeddedComponentInstances();
    if (newDoc) {
      this.build(newDoc);
      this.docRendered.emit();
    }
  }

  /**
   * Add doc content to host element and build it out with embedded components
   */
  private build(doc: DocumentContents) {

    // security: the doc.content is always authored by the Developer Team
    // and is considered to be safe
    this.docElement.innerHTML = doc.contents || '';

    if (!doc.contents) { return; }
    this.addTitle();
    this.createEmbeddedComponentInstances();
  }

  ngDoCheck() {
    this.embeddedComponentInstances.forEach(
      comp => comp.changeDetectorRef.detectChanges()
    );
  }

  ngOnDestroy() {
    this.destroyEmbeddedComponentInstances();
  }

  //// helpers ////

  /** Add the doc's first <h1>'s content as the browser tab (and button) title */
  private addTitle() {
    let title = '';
    const titleEl = this.docElement.querySelector('h1');
    if (titleEl) {
      title = (titleEl.innerText || titleEl.textContent).trim();
    }
    this.titleService.setTitle(title ? `Ng Dynamic - ${title}` : 'Ng Dynamic');
  }

  /**
   * Create the map of EmbeddedComponentFactories, keyed by their selectors.
   * @param embeddableComponents The embedded component classes
   * @param componentFactoryResolver Finds the ComponentFactory for a given Component
   */
  private createEmbeddedComponentFactories(
    embeddableComponents: EmbeddableComponents,
    componentFactoryResolver: ComponentFactoryResolver) {

    this.embeddableComponentFactories = new Map<string, EmbeddableComponentFactory>();

    for (const component of embeddableComponents.components) {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
      const selector = componentFactory.selector;
      const contentPropertyName = this.selectorToContentPropertyName(selector);
      this.embeddableComponentFactories.set(selector, { contentPropertyName, componentFactory });
    }
  }

  /**
   * Create and inject embedded components into the current doc content
   * wherever their selectors are found
   **/
  private createEmbeddedComponentInstances() {
    this.embeddableComponentFactories.forEach(
      ({ contentPropertyName, componentFactory }, selector) => {

      // All current doc elements with this embedded component's selector
      const embeddedComponentElements =
        this.docElement.querySelectorAll(selector) as any as HTMLElement[];

      // Create an Angular embedded component for each element.
      for (const element of embeddedComponentElements){
        // Preserve the current element content as a property of the element
        // because the component factory will clear the element's content.
        // security: the source of this innerHTML is always authored by the Developer Team
        // and is considered to be safe
        element[contentPropertyName] = element.innerHTML;

        // JUST LIKE BOOTSTRAP
        // factory creates the component, using the DocViewer's parent injector,
        // and replaces the given element's content with the component's resolved template.
        this.embeddedComponentInstances
          .push(componentFactory.create(this.injector, [], element));
      }
    });
  }

  /**
   * Destroy the current embedded component instances
   * or else there will be memory leaks.
   **/
  private destroyEmbeddedComponentInstances() {
    this.embeddedComponentInstances.forEach(comp => comp.destroy());
    this.embeddedComponentInstances.length = 0;
  }

  /**
   * Compute the component content property name by
   * converting the selector to camelCase and appending the suffix, 'Content'.
   * Ex: live-example => liveExampleContent
   */
  private selectorToContentPropertyName(selector: string) {
    return selector.replace(/-(.)/g, (match, $1) => $1.toUpperCase()) + 'Content';
  }
}
