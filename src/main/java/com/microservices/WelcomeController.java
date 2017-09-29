package com.microservices;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.microservices.service.RestartInfoDetailsService;
import com.microservices.web.rest.model.RestartInfoDetailsRestModel;

@Controller
public class WelcomeController {

	@Autowired
	private RestartInfoDetailsService restartInfoDetailsService;

	//@RequestMapping(value = "/dashboard")
	/*public String gotoHomePage() {
		return "dashboard";
	}*/
	@RequestMapping(value = "/")
	public String gotoHomePage1() {
		return "index";
	}

	//@RequestMapping(value = "/restartInfo", method = org.springframework.web.bind.annotation.RequestMethod.POST)
	public String saveRestartInfoDetails(@RequestBody RestartInfoDetailsRestModel obj, HttpSession session,
			Model model) {
		System.out.println("router : " + obj);
		
		String msg = restartInfoDetailsService.addRestartInfoDetails(obj);
		session.setAttribute("getAlert", "yes");

		model.addAttribute("command", new RestartInfoDetailsRestModel());
		return "restartinfo";
	}

	/*@RequestMapping(value="/saveEmp",method=org.springframework.web.bind.annotation.RequestMethod.POST)
	public String saveEmployee(@ModelAttribute("command") EmployeeRestModel employee,HttpSession session,Model model)
	{	
		System.out.println("emp : "+employee);
			
		List<String> empDetails=new ArrayList<>();
		
		empDetails.add(employee.getFname());
		empDetails.add(employee.getLname());
		empDetails.add(employee.getDept());
		empDetails.add(employee.getCity());
		
		String msg=empService.saveEmp(empDetails);
		session.setAttribute("getAlert", "yes");
		
		model.addAttribute("command", new EmployeeRestModel());
		return "addEmployee";
	}*/
}
