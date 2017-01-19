import {expect} from 'chai';
import {Autocomplete} from 'components/Autocomplete.jsx';
import {Button} from 'components/Button.jsx';
import ComponentStore from 'helpers/componentStore';

describe('ComponentStore', () => {
  beforeEach(() => {
    ComponentStore.componentList = {};
  });

  describe('registerComponent', () => {
    it('should register a component', () => {
      ComponentStore.registerComponent('autocomplete', Autocomplete);
      expect(ComponentStore.componentList).to.deep.eql({autocomplete: Autocomplete});
    });
  });

  describe('getRegisteredComponent', () => {
    it('should return the registered component', () => {
      const type = 'autocomplete';
      ComponentStore.registerComponent(type, Autocomplete);
      const registeredComponent = ComponentStore.getRegisteredComponent(type);
      expect(registeredComponent).to.eql(Autocomplete);
    });

    it('should return the registered component irrespective of case of type', () => {
      const type = 'autOcomplete';
      ComponentStore.registerComponent(type, Autocomplete);
      expect(ComponentStore.getRegisteredComponent(type)).to.deep.eql(Autocomplete);

      const registeredComponent = ComponentStore.getRegisteredComponent('auTOcomplete');
      expect(registeredComponent).to.eql(Autocomplete);
    });

    it('should return undefined when no matching component found', () => {
      const registeredComponent = ComponentStore.getRegisteredComponent('something');
      expect(registeredComponent).to.eql(undefined);
    });
  });

  describe('deRegisterComponent', () => {
    it('should deRegisterComponent component irrespective of case', () => {
      ComponentStore.registerComponent('autoComplete', Autocomplete);
      expect(ComponentStore.getRegisteredComponent('autocomplete')).to.deep.eql(Autocomplete);
      ComponentStore.deRegisterComponent('autoComplete');
      ComponentStore.deRegisterComponent('someRandomThing');
      expect(ComponentStore.getRegisteredComponent('autoComplete')).to.eql(undefined);
      expect(ComponentStore.getRegisteredComponent('someRandomThing')).to.deep.eql(undefined);
    });
  });

  describe('getAllRegisteredComponents', () => {
    it('should return all the registered components', () => {
      const expectedComponents = {autocomplete: Autocomplete, button: Button};
      ComponentStore.registerComponent('autocomplete', Autocomplete);
      ComponentStore.registerComponent('button', Button);
      expect(ComponentStore.getAllRegisteredComponents()).to.deep.eql(expectedComponents);
    });
  });

});
