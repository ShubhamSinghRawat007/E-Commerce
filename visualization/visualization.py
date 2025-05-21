import matplotlib.pyplot
import matplotlib
matplotlib.use("Agg")# Add this line to avoid errors

plt = matplotlib.pyplot

from io import BytesIO

class Visualize:

    def __init__(self):
        pass

    @staticmethod
    def generate_new_old_customers_graph(dates_for_chart: list, values_for_new_customers: list, values_for_returning_customers: list) -> BytesIO:
        
        plt.figure(figsize=(10, 5))
        plt.plot(dates_for_chart, values_for_new_customers, label="New Customers", color="#FF9900")
        plt.plot(dates_for_chart, values_for_returning_customers, label="Returning Customers", color="green")
        plt.xlabel('Date')
        plt.xticks(dates_for_chart[::10], rotation=45)
        plt.gcf().autofmt_xdate()
        plt.ylabel('People')
        plt.title('New Customers and Returning Customers')
        plt.grid(True)
        plt.legend()
        plt.xticks(rotation=45)
        plt.tight_layout()

        img = BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()

        return img

    @staticmethod
    def generate_revenue_overtime_graph(dates:list, revenue:list) -> BytesIO:
        plt.figure(figsize=(12, 5))  # Adjust figure size for better readability
        plt.plot(dates, revenue, label="Revenue", color="green")
        plt.xticks(dates[::10])  # Keep every 10th date for better spacing
        plt.gcf().autofmt_xdate()  # Automatically format and rotate dates
        plt.xlabel('Date')
        plt.ylabel('Revenue')
        plt.gcf().set_facecolor('none')
        plt.title('Revenue Over Time')
        plt.tight_layout()  # Adjust layout to avoid clipping

        img = BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()

        return img
        
    @staticmethod
    def generate_order_status_graph(statuses: list, values: list) -> BytesIO:
        plt.figure(figsize=(10, 5))
        plt.pie(values, labels=statuses, autopct='%1.1f%%', startangle=140, wedgeprops={'width': 0.65})
        plt.title('Order Status Distribution')
        plt.legend(loc='best', bbox_to_anchor=(1, 1))
        
        plt.gcf().set_facecolor('none')
        
        img = BytesIO()
        plt.savefig(img, format='png', bbox_inches='tight')
        img.seek(0)
        plt.close()
        return img

    @staticmethod 
    def generate_state_order_distribution_graph(states: list, count: list):
        n =  len(states)
        plt.figure(figsize=(24, 20+(n//10)))
        bars = plt.barh(states, count, color="#FFFF00")
        plt.title("States and Orders")
        plt.ylabel("States")
        plt.xlabel("No. of Orders")
        plt.tight_layout(pad=1.0, w_pad=0.5, h_pad=0.5) 
        plt.gcf().set_facecolor('none')
        plt.grid(axis='x')

        # Add labels to the top of each bar
        for bar in bars:
            width = bar.get_width()
            y = bar.get_y() + bar.get_height() / 2
            plt.text(width, y, f'{width:,.0f}', ha='left', va='center')


        img = BytesIO()
        plt.savefig(img, format='png',  bbox_inches='tight')
        img.seek(0)
        plt.close()
        return img

    @staticmethod
    def payment_method_breakdown_graph(methods: list, count: list):
        plt.figure(figsize=(10, 5))
        plt.pie(count, labels=methods, autopct='%1.1f%%', startangle=140, wedgeprops={'width': 0.65})
        plt.legend(loc='best', bbox_to_anchor=(1, 1))
        plt.gcf().set_facecolor('none')
        plt.title('Payment Method Breakdown')
        img = BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()
        return img
    
if __name__ == "__main__":
    ...