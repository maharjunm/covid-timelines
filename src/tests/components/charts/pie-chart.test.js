import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ChartsContainer from '../../../components/charts';
import PieChart from '../../../components/charts/pie-chart';

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
        },
        getTopCountries: () => {
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
describe("Pie Chart", () => {
    test('should load pie chart', () => {
        const props = {
            country: {
                states: [],
                country: "India",
            }
        }
        const wrapper = shallow(<PieChart {...props} />);
        expect(wrapper.find('CanvasJSChart').length).toBe(1);
    });
})
