<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xxl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-5">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
            <a href="" class="ml-auto flex text-theme-1 dark:text-theme-10">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ShoppingCartIcon class="report-box__icon text-theme-10" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-theme-9 cursor-pointer"
                        content="33% Higher than last month"
                      >
                        33% <ChevronUpIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-bold leading-8 mt-6">4.710</div>
                  <div class="text-base text-gray-600 mt-1">Item Sales</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <CreditCardIcon class="report-box__icon text-theme-11" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-theme-6 cursor-pointer"
                        content="2% Lower than last month"
                      >
                        2% <ChevronDownIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-bold leading-8 mt-6">3.721</div>
                  <div class="text-base text-gray-600 mt-1">New Orders</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <MonitorIcon class="report-box__icon text-theme-12" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-theme-9 cursor-pointer"
                        content="12% Higher than last month"
                      >
                        12% <ChevronUpIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-bold leading-8 mt-6">2.149</div>
                  <div class="text-base text-gray-600 mt-1">Total Products</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <UserIcon class="report-box__icon text-theme-9" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-theme-9 cursor-pointer"
                        content="22% Higher than last month"
                      >
                        22% <ChevronUpIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-bold leading-8 mt-6">152.040</div>
                  <div class="text-base text-gray-600 mt-1">Unique Visitor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 lg:col-span-6 mt-8">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Sales Report</h2>
            <div
              class="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700 dark:text-gray-300"
            >
              <CalendarIcon
                class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <Litepicker
                v-model="salesReportFilter"
                :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true
                  }
                }"
                class="form-control sm:w-56 box pl-10"
              />
            </div>
          </div>
          <div class="intro-y box p-5 mt-12 sm:mt-5">
            <div class="flex flex-col xl:flex-row xl:items-center">
              <div class="flex">
                <div>
                  <div
                    class="text-theme-19 dark:text-gray-300 text-lg xl:text-xl font-bold"
                  >
                    $15,000
                  </div>
                  <div class="mt-0.5 text-gray-600 dark:text-gray-600">
                    This Month
                  </div>
                </div>
                <div
                  class="w-px h-12 border border-r border-dashed border-gray-300 dark:border-dark-5 mx-4 xl:mx-6"
                ></div>
                <div>
                  <div
                    class="text-gray-600 dark:text-gray-600 text-lg xl:text-xl font-medium"
                  >
                    $10,000
                  </div>
                  <div class="mt-0.5 text-gray-600 dark:text-gray-600">
                    Last Month
                  </div>
                </div>
              </div>
              <div class="dropdown xl:ml-auto mt-5 xl:mt-0">
                <button
                  class="dropdown-toggle btn btn-outline-secondary font-normal"
                  aria-expanded="false"
                >
                  Filter by Category
                  <ChevronDownIcon class="w-4 h-4 ml-2" />
                </button>
                <div class="dropdown-menu w-40">
                  <div
                    class="dropdown-menu__content box dark:bg-dark-1 p-2 overflow-y-auto h-32"
                  >
                    <a
                      href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >PC & Laptop</a
                    >
                    <a
                      href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >Smartphone</a
                    >
                    <a
                      href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >Electronic</a
                    >
                    <a
                      href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >Photography</a
                    >
                    <a
                      href=""
                      class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                      >Sport</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="report-chart">
              <ReportLineChart :height="169" class="mt-6" />
            </div>
          </div>
        </div>
        <!-- END: Sales Report -->
        <!-- BEGIN: Weekly Top Seller -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Weekly Top Seller</h2>
            <a href="" class="ml-auto text-theme-1 dark:text-theme-10 truncate"
              >Show More</a
            >
          </div>
          <div class="intro-y box p-5 mt-5">
            <ReportPieChart :height="300" class="mt-3" />
            <div class="mt-8">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
                <span class="truncate">17 - 30 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">62%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-theme-1 rounded-full mr-3"></div>
                <span class="truncate">31 - 50 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">33%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
                <span class="truncate">>= 50 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">10%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Weekly Top Seller -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Sales Report</h2>
            <a href="" class="ml-auto text-theme-1 dark:text-theme-10 truncate"
              >Show More</a
            >
          </div>
          <div class="intro-y box p-5 mt-5">
            <ReportDonutChart :height="300" class="mt-3" />
            <div class="mt-8">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
                <span class="truncate">17 - 30 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">62%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-theme-1 rounded-full mr-3"></div>
                <span class="truncate">31 - 50 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">33%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
                <span class="truncate">>= 50 Years old</span>
                <div
                  class="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden"
                ></div>
                <span class="font-medium xl:ml-auto">10%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Sales Report -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, provide } from "vue";
import ReportLineChart from "@/components/report-line-chart/Main.vue";
import ReportDonutChart from "@/components/report-donut-chart/Main.vue";
import ReportPieChart from "@/components/report-pie-chart/Main.vue";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main.vue";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main.vue";

export default defineComponent({
  components: {
    ReportLineChart,
    ReportDonutChart,
    ReportPieChart,
    ReportDonutChart1,
    SimpleLineChart1
  },
  setup() {
    const salesReportFilter = ref();
    const importantNotesRef = ref();

    provide("bind[importantNotesRef]", el => {
      importantNotesRef.value = el;
    });

    const prevImportantNotes = () => {
      const el = importantNotesRef.value;
      el.tns.goTo("prev");
    };
    const nextImportantNotes = () => {
      const el = importantNotesRef.value;
      el.tns.goTo("next");
    };

    return {
      salesReportFilter,
      prevImportantNotes,
      nextImportantNotes
    };
  }
});
</script>
