import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ChartsContainer from '../../../components/charts';

jest.mock('./../../../utils/get-country-details.js', () => {
    return {
        __esModule: true,
        default: () => {
            return {
                confirmedCases: [],
                deathCases: [],
                recoveredCases: [],
            }
        },
        getAllCases: () => {
            return []
        }
    }
});
jest.mock("canvasjs-react-charts", () => {
    return {
      CanvasJSChart: () => (<div> </div>)
    }
  });
configure({ adapter: new Adapter() });
describe("Charts", () => {
    test('should load only country details', () => {
        const props = {
            country: {
                states: [],
                country: "India",
            }
        }
        const wrapper = shallow(<ChartsContainer {...props} />);
        expect(wrapper.find('CanvasJSChart').length).toBe(1);
    });

    test('should load only state details', () => {
        const props = {
            country: {
                states: [{}],
                country: "India",
                selectedState: "AP"
            }
        }
        const wrapper = shallow(<ChartsContainer {...props} />);
        expect(wrapper.find('CanvasJSChart').length).toBe(1);
    });
})
