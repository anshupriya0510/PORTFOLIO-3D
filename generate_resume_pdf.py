import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

output_path = r"c:\Users\vedant\OneDrive\Desktop\3dportfolio\public\software_Anshu__4_.pdf"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Document Setup - tight single-page margins
doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=28,
    bottomMargin=24
)

styles = getSampleStyleSheet()

# Custom typography styles
name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=20,
    alignment=1, # Center
    textColor=colors.HexColor('#000000')
)

role_style = ParagraphStyle(
    'RoleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12,
    alignment=1,
    textColor=colors.HexColor('#1a1a1a')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=1,
    textColor=colors.HexColor('#003366')
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=12,
    textColor=colors.HexColor('#000000'),
    spaceAfter=2,
    spaceBefore=4
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8,
    leading=10.5,
    textColor=colors.HexColor('#1a1a1a')
)

bold_label_style = ParagraphStyle(
    'BoldLabel',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8,
    leading=10.5,
    textColor=colors.HexColor('#000000')
)

bullet_style = ParagraphStyle(
    'BulletText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8,
    leading=10.2,
    leftIndent=10,
    firstLineIndent=-6,
    textColor=colors.HexColor('#1a1a1a')
)

def section_header(title):
    return [
        Spacer(1, 2),
        Paragraph(title.upper(), section_heading_style),
        HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=3)
    ]

story = []

# Header
story.append(Paragraph("Anshu Priya", name_style))
story.append(Paragraph("Software &amp; DevOps Engineer", role_style))
story.append(Spacer(1, 1))

contact_html = (
    "+91-9142714797 | "
    "<a href='mailto:anshu.priya4748@gmail.com' color='#003366'>anshu.priya4748@gmail.com</a> | "
    "<a href='https://github.com/anshupriya0510' color='#003366'>GitHub</a> | "
    "<a href='https://www.linkedin.com/in/anshupriya-engineer' color='#003366'>LinkedIn</a> | "
    "<a href='https://leetcode.com/u/anshu_priya05/' color='#003366'>LeetCode</a>"
)
story.append(Paragraph(contact_html, contact_style))

# SUMMARY
story.extend(section_header("SUMMARY"))
summary_text = (
    "Software Engineer and DevOps-focused professional with hands-on experience in software development, cloud deployment, and "
    "automation. Built production-style applications using AWS, Docker, Kubernetes, Jenkins, and GitHub Actions, including a containerized "
    "E-Commerce application deployed on K3s with Prometheus and Grafana monitoring. Gained practical industry experience through Web "
    "Designing and Machine Learning internships, with strong foundations in Linux, CI/CD, cloud infrastructure, containerization, and scalable "
    "application deployment."
)
story.append(Paragraph(summary_text, body_style))

# SKILLS
story.extend(section_header("SKILLS"))
skills_html = """
<b>Programming:</b> Java, JavaScript<br/>
<b>Core:</b> Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems, Networking<br/>
<b>Web Development:</b> React.js, Node.js, MongoDB, HTML, CSS<br/>
<b>Cloud &amp; DevOps:</b> AWS (EC2, S3, IAM, VPC, RDS, Lambda), Linux, Docker, Docker Compose, Kubernetes, K3s, Jenkins, Git/GitHub, GitHub Actions, CI/CD, Ansible, Terraform, Grafana<br/>
<b>Protocols:</b> HTTP, HTTPS, SSH
"""
story.append(Paragraph(skills_html.strip(), body_style))

# EXPERIENCE
story.extend(section_header("EXPERIENCE"))

# Exp 1
exp1_header = Table([
    [Paragraph("<b>Larch Soft Pvt. Ltd.</b>", bold_label_style), Paragraph("<font color='#333333'>Jun 2026 – Aug 2026</font>", ParagraphStyle('R1', parent=body_style, alignment=2))]
], colWidths=[380, 160])
exp1_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(exp1_header)
story.append(Paragraph("<i>Web Designing Intern</i>", body_style))
story.append(Paragraph("– Completed a two-month internship focused on web designing and development.", bullet_style))
story.append(Paragraph("– Contributed to web design and development tasks through the Larch Soft Internship Program. [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>]", bullet_style))

story.append(Spacer(1, 2))

# Exp 2
exp2_header = Table([
    [Paragraph("<b>National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi</b>", bold_label_style), Paragraph("<font color='#333333'>Jun 2025 – Jul 2025</font>", ParagraphStyle('R2', parent=body_style, alignment=2))]
], colWidths=[400, 140])
exp2_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(exp2_header)
story.append(Paragraph("<i>Research Intern – Crime Hotspot Prediction Using Machine Learning</i>", body_style))
story.append(Paragraph("– Implemented machine learning models for crime hotspot prediction under Dr. Shalini Mahto.", bullet_style))
story.append(Paragraph("– Collaborated with mentors and communicated technical progress throughout the project lifecycle. [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>]", bullet_style))

# PROJECTS
story.extend(section_header("PROJECTS"))

# Proj 1
p1_header = Table([
    [Paragraph("<b>Urban Shield</b><br/><font size=7.5 color='#333333'><i>Crime Hotspot Detection Platform</i></font>", bold_label_style), Paragraph("[<a href='https://github.com/anshupriya0510' color='#003366'>GitHub</a>]", ParagraphStyle('RP1', parent=body_style, alignment=2))]
], colWidths=[450, 90])
p1_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(p1_header)
story.append(Paragraph("– <b>Problem:</b> Citizens lacked easy access to location-based crime insights.", bullet_style))
story.append(Paragraph("– <b>Solution:</b> Developed a crime hotspot platform with Google Maps integration, crime reporting and area-wise analytics.", bullet_style))
story.append(Paragraph("– <b>Tech Stack:</b> HTML, JavaScript, CSS, Google Maps API", bullet_style))
story.append(Spacer(1, 2))

# Proj 2
p2_header = Table([
    [Paragraph("<b>Automated CI/CD Pipeline for MERN Stack Application</b><br/><font size=7.5 color='#333333'><i>Cloud &amp; DevOps Project</i></font>", bold_label_style), Paragraph("[<a href='https://github.com/anshupriya0510/WatchList-Tracker' color='#003366'>GitHub</a>]", ParagraphStyle('RP2', parent=body_style, alignment=2))]
], colWidths=[450, 90])
p2_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(p2_header)
story.append(Paragraph("– <b>Problem:</b> Manual deployments were slow and prone to configuration errors.", bullet_style))
story.append(Paragraph("– <b>Solution:</b> Automated CI/CD using GitHub Actions, Jenkins, Docker, Docker Compose, Docker Hub and AWS EC2.", bullet_style))
story.append(Paragraph("– <b>Impact:</b> Reduced manual effort and enabled reliable software releases.", bullet_style))
story.append(Paragraph("– <b>Tech Stack:</b> GitHub Actions, Jenkins, Docker, Docker Compose, AWS EC2", bullet_style))
story.append(Spacer(1, 2))

# Proj 3
p3_header = Table([
    [Paragraph("<b>3-Tier Architecture on AWS</b><br/><font size=7.5 color='#333333'><i>Cloud Infrastructure Project</i></font>", bold_label_style), Paragraph("[<a href='https://github.com/anshupriya0510/3-tier-APP' color='#003366'>GitHub</a>]", ParagraphStyle('RP3', parent=body_style, alignment=2))]
], colWidths=[450, 90])
p3_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(p3_header)
story.append(Paragraph("– <b>Problem:</b> Single-server deployment lacked scalability, availability and security.", bullet_style))
story.append(Paragraph("– <b>Solution:</b> Designed a secure AWS architecture using VPC, EC2, ALB, ASG, NAT Gateway, Bastion Host and RDS.", bullet_style))
story.append(Paragraph("– <b>Impact:</b> Improved scalability, availability and secure database access.", bullet_style))
story.append(Paragraph("– <b>Tech Stack:</b> AWS EC2, VPC, ALB, ASG, RDS, NAT Gateway", bullet_style))
story.append(Spacer(1, 2))

# Proj 4
p4_header = Table([
    [Paragraph("<b>Production-Style E-Commerce DevOps Application</b><br/><font size=7.5 color='#333333'><i>Cloud &amp; DevOps Project</i></font>", bold_label_style), Paragraph("[<a href='https://github.com/anshupriya0510/DevOps_E-commerce' color='#003366'>GitHub</a>]", ParagraphStyle('RP4', parent=body_style, alignment=2))]
], colWidths=[450, 90])
p4_header.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(p4_header)
story.append(Paragraph("– <b>Problem:</b> Manual deployment and monitoring limited application delivery efficiency and scalability.", bullet_style))
story.append(Paragraph("– <b>Solution:</b> Built a containerized DevOps workflow using Docker, GitHub Actions and Docker Hub, deployed on K3s Kubernetes hosted on AWS EC2.", bullet_style))
story.append(Paragraph("– <b>Monitoring:</b> Implemented Prometheus, kube-state-metrics and Grafana with backend availability alerting.", bullet_style))
story.append(Paragraph("– <b>Tech Stack:</b> Docker, GitHub Actions, K3s, Kubernetes, AWS EC2, Prometheus, Grafana", bullet_style))

# EDUCATION
story.extend(section_header("EDUCATION"))
edu_table = Table([
    [Paragraph("<b>Sarala Birla University</b><br/>Bachelor of Technology (B.Tech) in Computer Science Engineering", body_style),
     Paragraph("Ranchi, Jharkhand<br/>2023 – 2027", ParagraphStyle('EduR', parent=body_style, alignment=2))]
], colWidths=[380, 160])
edu_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(edu_table)

# CERTIFICATIONS
story.extend(section_header("CERTIFICATIONS"))
certs_html = """
• <b>AWS Certified Developer</b> – Infosys [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>]<br/>
• <b>CCNA Network Course</b> – Cisco [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>]<br/>
• <b>Introduction to DevOps and DevSecOps</b> – Simplilearn [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>]
"""
story.append(Paragraph(certs_html.strip(), body_style))

# HACKATHONS & COMPETITIONS
story.extend(section_header("HACKATHONS & COMPETITIONS"))
hacks_html = """
<b>Hacktron’26 – BIT Sindri (Finalist)</b> [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>] – Built an AI Meeting-to-Task Automation system using Whisper AI, spaCy and Gemini Flash 2.5.<br/>
<b>Hackathon on Cyber Security’26 – BIT Mesra</b> [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>] – Developed an Autonomous Deepfake Detection and Response System using OpenCV and Python Flask.<br/>
<b>INNOVERSE TECH FEST’25 – St. Xavier’s Ranchi</b> [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>] – Developed EchoSkill, a skill-exchange platform.<br/>
<b>SBU Coding Challenge’26 – Sarala Birla University</b> [<a href='https://github.com/anshupriya0510' color='#003366'>Certificate</a>] – Participated in a university-level coding competition.
"""
story.append(Paragraph(hacks_html.strip(), body_style))

# Build Document
doc.build(story)
print("PDF generated successfully at:", output_path)
