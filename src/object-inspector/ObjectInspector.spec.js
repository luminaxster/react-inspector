import TestRenderer from 'react-test-renderer';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import ObjectInspector from './ObjectInspector';

describe('ObjectInspector', () => {
   it('should render', () => {
      const tree = TestRenderer.create(<ObjectInspector/>);
      expect(tree).toMatchSnapshot();
   });
   
   it('passes `nodeRenderer` prop to <TreeView/>', () => {
      const nodeRenderer = () => <span>unit test</span>;
      
      const tree = TestRenderer.create(
         <ObjectInspector nodeRenderer={nodeRenderer}/>
      );
      
      expect(tree).toMatchSnapshot();
   });
});

describe('ObjectInspector Content', () => {
   let container;
   let prev;
   
   beforeAll(()=>{
      prev = global.IS_REACT_ACT_ENVIRONMENT;
      global.IS_REACT_ACT_ENVIRONMENT = true;
   });
   
   afterAll(()=>{
      global.IS_REACT_ACT_ENVIRONMENT = prev;
   });
   
   beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
   });
   
   afterEach(() => {
      document.body.removeChild(container);
      container = null;
   });
   
   it('should render with Maps with Regex and Maps keys', () => {
      const data = new Map([
         [/\S/g, 'Regular Expression key']
      ]);
      
      
      act(() => {
         createRoot(container).render(<ObjectInspector data={data}/>);
      });
      
      const button = container.querySelector('div');
      
      act(() => {
         button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      });
      
      expect(container.innerHTML).toMatchSnapshot();
   });
})
